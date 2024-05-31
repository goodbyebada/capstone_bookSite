"use client";

import React, { useEffect, useState } from "react";
import ShowBooks from "@components/containers/book/showBooks";
import styles from "@styles/book.module.css";
import { Data } from "@components/model/interfaceModel";

export default function BookListTemplate({ dataList }: { dataList: Data[] }) {
  /* [{item: [{title: "", link:""}]}, {item : []}] 을 받아온다 */

  return (
    <div className={styles.BooksDiv}>
      <ShowBooks dataList={dataList} />
    </div>
  );
}

// "use client";
//
// import React, { useEffect, useState } from "react";
// import ShowBooks from "@components/containers/book/showBooks";
// import styles from "@styles/book.module.css";
// import { Data } from "@components/model/interfaceModel";
//
// export default function BookListTemplate({ dataList }: { dataList: Data[] }) {
//     return (
//         <div className={styles.BooksDiv}>
//             <ShowBooks dataList={dataList} />
//             <h2>Received Data:</h2>
//             <pre>{JSON.stringify(dataList, null, 2)}</pre> {/* 데이터를 JSON 형식으로 출력 */}
//         </div>
//     );
// }
