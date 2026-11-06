import { NextRequest,NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { db } from "@/lib/supabase";

export async function POST(req:NextRequest){
  try{
    const notification=await req.json();
    const core=new midtransClient.CoreApi({isProduction:process.env.MIDTRANS_IS_PRODUCTION==="true",serverKey:process.env.MIDTRANS_SERVER_KEY!,clientKey:process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!});
    // Verify with Midtrans directly; do not trust browser callbacks or unverified webhook payloads.
    const status=await core.transaction.notification(notification);
    const paid=status.transaction_status==="settlement"||(status.transaction_status==="capture"&&status.fraud_status==="accept");
    const finalStatus=paid?"paid":status.transaction_status==="expire"?"expired":status.transaction_status==="cancel"||status.transaction_status==="deny"?"failed":"pending";
    const {error}=await db().from("donations").update({
      status:finalStatus,midtrans_transaction_id:status.transaction_id,
      payment_type:status.payment_type,paid_at:paid?new Date().toISOString():null
    }).eq("order_id",status.order_id);
    if(error)throw error;
    return NextResponse.json({received:true});
  }catch(e:any){console.error("midtrans-notification",e);return NextResponse.json({error:"Notification verification failed."},{status:400});}
}