import S from "./MainRightBottomOptions.style";

const MainRightBottomOptions = ({
  tab,
  shareMode,
  isPraySelected,
  showRightBottomOptions,
  setShowRightBottomOptions,
  setShowAlertModal,
  categoryList,
  setCurrentOverlay,
  setShareMode,
}) => {
  if (shareMode || isPraySelected) return null;

  return (
    <>
      {!shareMode && !isPraySelected && (
        <>
          <S.OptionItem
            src="images/ic_main_option.svg"
            alt="main_option_icon"
            onClick={() => setShowRightBottomOptions(true)}
            isVisible={!showRightBottomOptions}
            movingDistance={0}
          />
          <S.OptionItem
            src="images/ic_main_option_close.svg"
            alt="main_option_close_icon"
            onClick={() => setShowRightBottomOptions(false)}
            isVisible={showRightBottomOptions}
            movingDistance={0}
          />
          <S.OptionItem
            src="images/ic_main_order.svg"
            alt="main_order_icon"
            onClick={() => {
              if (categoryList.length === 0) {
                setShowAlertModal(true);
              }
              setCurrentOverlay("CHANGE_ORDER");
              setShowRightBottomOptions(false);
            }}
            isVisible={showRightBottomOptions}
            movingDistance={72}
          />
        </>
      )}
      {tab === "내가 쓴" && (
        <S.OptionItem
          src="images/ic_main_share.svg"
          alt="main_share_icon"
          onClick={() => {
            setShareMode(true);
            setShowRightBottomOptions(false);
          }}
          isVisible={showRightBottomOptions}
          movingDistance={144}
        />
      )}
    </>
  );
};

export default MainRightBottomOptions;
