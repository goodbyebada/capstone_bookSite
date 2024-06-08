import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("=========\n");
  console.log(searchParams);
  console.log("=========\n");
  let catergory = searchParams.get("catergory");

  catergory = "love";

  const apiURL = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?";
  const TTBKey = `ttbds05199k1053001`;

  //test
  //www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbds05199k1053001&Query=love&MaxResults=20&output=js&Version=20131101

  const restUrl =
    `ttbkey=${TTBKey}` +
    `&Query=${catergory}` +
    `&QueryType=Title` +
    `&Cover=Big` +
    `&MaxResults=20&output=js&Version=20131101`;

  const res = await fetch(apiURL + restUrl);
  const product = await res.json();

  return NextResponse.json(product.item);
}
