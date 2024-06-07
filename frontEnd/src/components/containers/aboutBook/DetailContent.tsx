"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BookItem } from "@components/model/interfaceModel";
import { navItemType } from "@components/model/interfaceModel";
import DetailInfo from "./detail/DetailInfo";
import DetailNav from "./detail/DetailNav";

export default function DetailContent({
  bookData,
  recommandBookList,
  changeBook,
}: {
  bookData: BookItem;
  recommandBookList: BookItem[];
  changeBook: (bookItem: BookItem) => void;
}) {
  const { description, categoryName } = bookData;
  const scrollRef = useRef<HTMLElement[]>([]); // <- DetailReview1, DetailReview2, DetailReview3

  /**
   * navItem content
   * DetailReview 에 들어갈 content이다.
   */
  const navItemList: navItemType[] = [
    {
      idx: 0,
      tagId: "description",
      item: "책 소개",
      content: description,
      onClickBook: null,
    },
    {
      idx: 1,
      tagId: "category",
      item: "카테고리",
      content: categoryName,
      onClickBook: null,
    },
    {
      idx: 2,
      tagId: "bookRecommendations",
      item: "이 책을 좋아한다면",
      content: recommandBookList,
      onClickBook: changeBook,
    },
  ];

  return (
    <div>
      <DetailNav navItemList={navItemList} scrollRef={scrollRef} />

      {navItemList.map((elem, idx) => (
        <DetailInfo key={idx} {...elem} ref={scrollRef} />
      ))}
    </div>
  );
}
