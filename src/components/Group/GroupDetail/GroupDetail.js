import React, { useEffect, useRef } from "react";
import UserHeader from "../../UserHeader";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import GroupPrayList from "./GroupPrayList";
import RightIcons from "./RightIcons";
import { useState } from "react";
import GroupSetting from "../GroupSetting/GroupSetting";
import { useGroupPray } from "../../../hooks/useGroupPray";
import useFlutterWebview from "../../../hooks/useFlutterWebview";
import { usePray } from "../../../hooks/usePray";
import MainContent from "../../Main/MainContent";
import { useCategory } from "../../../hooks/useCategory";

const GroupDetail = ({ group, setShowGroupDetail }) => {
  const [showGroupSetting, setShowGroupSetting] = useState(false);
  const { groupPrayList, groupNotification } = useGroupPray(group.id);
  const isData = Object.keys(groupPrayList).length !== 0;
  const { shareLink, isMobile } = useFlutterWebview();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

  const [shareMode, setShareMode] = useState(false);
  const [tab, setTab] = useState("personal");
  const { categoryList, firstCategoryIndex, refetchCategoryList } =
    useCategory(tab);
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState(firstCategoryIndex);
  const [categoryRefIndex, setCategoryRefIndex] = useState(0);
  const categoryRef = useRef([]);

  useEffect(() => {
    refetchCategoryList();
  }, [tab]);

  const onInvite = async () => {
    const groupId = group.id;
    var encodeGroupId = window.btoa(groupId.toString());
    if (isMobile()) {
      if (/android/i.test(navigator.userAgent)) {
        shareLink({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/group?id=` + encodeGroupId,
        });
      } else if (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        navigator.share
      ) {
        navigator.share({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/group?id=` + encodeGroupId,
        });
      } else {
        alert("초대하기가 지원되지 않는 환경 입니다.");
      }
    }
    console.log(`${WEB_ORIGIN}/group?id=` + encodeGroupId);
  };

  const onGroupPray = async (checkedPrayIds) => {
    console.log("checkedPrayIds", checkedPrayIds);
  };

  return (
    <Wrapper>
      {showGroupSetting && (
        <GroupSetting group={group} setShowGroupSetting={setShowGroupSetting} />
      )}
      <UserHeader
        rightIcons={() => {
          return (
            <RightIcons
              group={group}
              setShow={setShowGroupSetting}
              groupNoti={groupNotification}
            />
          );
        }}
        back={() => setShowGroupDetail((prev) => !prev)}
      >
        {group.name}
      </UserHeader>
      <GroupWrapper>
        <GroupInfo
          group={group}
          isData={isData}
          categoryList={categoryList}
          firstCategoryIndex={firstCategoryIndex}
          setShareMode={setShareMode}
          setTab={setTab}
        />
        <GroupPrayList
          group={group}
          groupPrayList={groupPrayList}
          isData={isData}
          categoryList={categoryList}
          firstCategoryIndex={firstCategoryIndex}
          setTab={setTab}
        />
      </GroupWrapper>
      <InviteBtn
        src="images/ic_group_invite.svg"
        alt="group_invite_icon"
        onClick={() => onInvite()}
      />
      {shareMode && (
        <MainContent
          categoryList={categoryList}
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
          tabType={tab}
          categoryRef={categoryRef}
          setCategoryRefIndex={setCategoryRefIndex}
          shareMode={shareMode}
          setShareMode={setShareMode}
          listHandler={onGroupPray}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 100;
`;

const GroupWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;

const InviteBtn = styled.img`
  position: fixed;
  bottom: 80px;
  right: 20px;
`;

export default GroupDetail;
