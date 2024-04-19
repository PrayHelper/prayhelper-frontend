import { forwardRef } from "react";
import { useMainStates } from "../../../pages/Main";
import GreenCheckbox from "../../GreenCheckbox/GreenCheckbox";
import { S } from "./CategoryBoxes.style";
import { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const ICON_HEART_FILLED = "images/ic_filled_heart.svg";
const ICON_HEART_EMPTY = "images/ic_empty_heart.svg";

const PrayerList = ({ prays }) => {
  const {
    tab,
    setActiveOverlays,
    isShareMode,
    cancelPray,
    todayPray,
    setCheckedIdList,
    checkedIdList,
    setSelectedPrayToEdit,
  } = useMainStates();

  const praySelectHandler = (pray) => {
    openBottomModal();
    setSelectedPrayToEdit(pray);
  };

  const openBottomModal = () => {
    setActiveOverlays(["PRAYER_BOTTOM_MODAL"]);
  };

  const todayHandler = (e, pray) => {
    e.stopPropagation();
    if (pray.isPrayedToday) {
      cancelPray(pray.prayId);
    } else {
      todayPray(pray.prayId);
    }
  };

  const shareCheckHandler = (e, prayId) => {
    if (e.target.checked) {
      setCheckedIdList((prev) => [...prev, prayId]);
    } else {
      setCheckedIdList((prev) => prev.filter((id) => id !== prayId));
    }
  };

  return (
    <>
      {prays.map((pray) => (
        <S.Item key={pray.prayId} onClick={() => praySelectHandler(pray)}>
          {/* 공유받은 기도제목이라면 기도한 사람 이름 표시 */}
          {tab === "shared" && (
            <S.ItemName selected={pray.isPrayedToday}>{pray.name}</S.ItemName>
          )}

          <S.ItemText>{pray.content}</S.ItemText>

          {isShareMode ? (
            // 공유모드 O -> 체크박스
            <GreenCheckbox
              id={pray.prayId}
              checked={checkedIdList.includes(pray.prayId)}
              handler={(e) => shareCheckHandler(e, pray.prayId)}
            />
          ) : (
            // 공유모드 X -> 하트
            <img
              src={pray.isPrayedToday ? ICON_HEART_FILLED : ICON_HEART_EMPTY}
              alt="heart_icon"
              onClick={(e) => todayHandler(e, pray)}
            />
          )}
        </S.Item>
      ))}
    </>
  );
};
