import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/itemIssue.scss';

const GoodIssue: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [itemDetail, setItemDetail] = useState<any | null>(null);
  const [issueImages, setIssueImages] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        if (!id) {
          console.error('아이템 ID가 제공되지 않았습니다.');
          return;
        }

        // 아이템 목록을 가져오는 요청
        const allItemResponse = await axios.get(
          'http://localhost:5000/api/item/all'
        );
        const allItems = allItemResponse.data.all_item;

        // id에 해당하는 아이템을 찾아 그 아이템의 이슈를 가져오는 요청
        const item = allItems.find((item: any) => item.id === parseInt(id));
        if (item) {
          // 해당 아이템의 이슈를 가져오는 요청
          const issueResponse = await axios.get(
            `http://localhost:5000/api/item/issue/${id}`
          );
          const issueData = issueResponse.data;

          // 상세 정보를 상태에 설정합니다.
          setItemDetail(item);
          // 해당 아이템의 이슈 이미지 URL을 상태에 설정합니다.
          setIssueImages(
            Object.values(
              issueData.item_issue.find(
                (issue: any) => issue.id === parseInt(id)
              ) || {}
            ).slice(1) as string[]
          );
        } else {
          console.error('해당하는 아이템을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생 : ', error);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (!itemDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="IssueCon">
        <div className="IssueDiv">
          <div style={{ width: '100%', height: '45px' }}>
            <div className="reverse">
              <img
                className="reverseImg"
                src={`${process.env.PUBLIC_URL}/image/setLeftArrow.png`}
                alt="뒤로가기"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </div>
          <form>
            <div className="IssueHeader">
              <div className="IssueImg">
                <img src={itemDetail.img} alt={itemDetail.title} />
              </div>
              <div className="IssueHeader2">
                <div className="IssueTitle">{itemDetail.title}</div>
                <div className="IssueBody">{itemDetail.body}</div>
                <div className="IssuePrice">
                  <div className="IssueSale">{itemDetail.sale}</div>
                  {itemDetail.price.toLocaleString()}원
                </div>
                <div className="IssueDeliveryReview">
                  {itemDetail.delivery && (
                    <div className="allDelivery">{itemDetail.delivery}</div>
                  )}
                  {itemDetail.review && (
                    <div className="allReview">리뷰 : {itemDetail.review}</div>
                  )}
                </div>
                <button type="button">
                  <div className="IssuepaymentDiv">구매하기 </div>
                </button>
              </div>
            </div>
          </form>

          <div className="IssueLine"></div>
          {issueImages &&
            issueImages.map(
              (imageUrl, index) =>
                imageUrl && ( // 이미지 URL이 null이 아닌 경우에만 렌더링
                  <div className="immg" key={index}>
                    <img src={imageUrl} alt={`Issue ${index + 1}`} />
                  </div>
                )
            )}

          <div style={{ height: '50px' }}></div>
        </div>
      </div>
    </>
  );
};

export default GoodIssue;
