'use client'
import StyleItem from './StyleItem'

export default function TravelStyle({ travelStylesList, lang, onCloseMenu }) {
  let travelStyleList = []
  if (travelStylesList?.data?.allTourStyle?.nodes) {
    travelStyleList = travelStylesList?.data?.allTourStyle?.nodes
  }
  const handleSort = (fn) => {
    const clone = [...fn]
    if (clone?.length > 0) {
      clone?.sort(function (a, b) {
        var numA = parseInt(a?.banner?.travelStyleInfo?.priority);
        var numB = parseInt(b?.banner?.travelStyleInfo?.priority);
        return numA - numB;
      });
    }

    return clone
  }
  travelStyleList = handleSort(travelStyleList)
  return (
    <div>
      <div className='grid grid-cols-3 gap-x-[7.91vw] gap-y-[2.88vw] content ml-auto mr-auto py-[2.49vw] '>
        {travelStyleList?.map((item, index) => (
          <StyleItem
            key={item?.id}
            image={item?.banner?.travelStyleInfo?.travelStyleImage}
            lang={lang}
            id={item?.slug}
            title={item?.banner?.travelStyleInfo?.travelStyleName}
            onCloseMenu={onCloseMenu}
          />
        ))}
      </div>
    </div>
  )
}
