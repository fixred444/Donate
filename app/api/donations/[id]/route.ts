import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export async function GET(_:Request,{params}:{params:{id:string}}){
  try{
    const {data,error}=await db().from("donations").select("id,status,amount,campaign_name,created_at").eq("id",params.id).maybeSingle();
    if(error)throw error;
    if(!data)return NextResponse.json({error:"Donasi tidak ditemukan."},{status:404});
    return NextResponse.json(data);
  }catch(e:any){return NextResponse.json({error:e.message||"Gagal memeriksa status."},{status:500});}
}