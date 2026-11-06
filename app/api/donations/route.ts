import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { db } from "@/lib/supabase";

const campaigns:Record<string,string>={karhutla:"Bantuan Karhutla",banjir:"Pemulihan Banjir",gempa:"Bantuan Penyintas Gempa"};

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    const {campaignId,amount,name,email}=body;
    if(!campaigns[campaignId]||!Number.isInteger(amount)||amount<10000||amount>50000000||!name?.trim()||!/^\\S+@\\S+\\.\\S+$/.test(email||""))
      return NextResponse.json({error:"Data donasi tidak valid."},{status:400});
    if(!process.env.MIDTRANS_SERVER_KEY||!process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY)
      return NextResponse.json({error:"Pembayaran belum aktif. Admin perlu mengisi kredensial Midtrans."},{status:503});
    const supabase=db();
    const donationId=crypto.randomUUID();
    const orderId=`NYALA-${donationId.replaceAll("-","").slice(0,20)}`;
    const {error:insertError}=await supabase.from("donations").insert({
      id:donationId,order_id:orderId,campaign_id:campaignId,campaign_name:campaigns[campaignId],
      amount,name:name.trim(),email:email.trim().toLowerCase(),status:"pending"
    });
    if(insertError)throw insertError;
    const snap=new midtransClient.Snap({isProduction:process.env.MIDTRANS_IS_PRODUCTION==="true",serverKey:process.env.MIDTRANS_SERVER_KEY,clientKey:process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY});
    const transaction=await snap.createTransaction({
      transaction_details:{order_id:orderId,gross_amount:amount},
      item_details:[{id:campaignId,price:amount,quantity:1,name:campaigns[campaignId]}],
      customer_details:{first_name:name.trim(),email:email.trim()},
      enabled_payments:["qris"],
      callbacks:{finish:`${process.env.NEXT_PUBLIC_SITE_URL}/?donation=${donationId}`}
    });
    await supabase.from("donations").update({midtrans_token:transaction.token,redirect_url:transaction.redirect_url}).eq("id",donationId);
    return NextResponse.json({donationId,token:transaction.token,redirectUrl:transaction.redirect_url});
  }catch(e:any){console.error("donation-create",e);return NextResponse.json({error:e.message||"Tidak dapat membuat donasi."},{status:500});}
}