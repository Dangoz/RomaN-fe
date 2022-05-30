import React from 'react'
import { Asset } from '@/types/unidata'

const Asset = ({ asset }: { asset: Asset }) => {
  return (
    <>
      <div className="m-2 w-[150px] h-[180px] border-2 border-purple-300 flex flex-col justify-center items-center z-10">
        {/* image */}
        <div>
          <img
            className="w-[150px] h-[150px]"
            src={
              asset.items && asset.items[0].address?.match(/\.(jpeg|jpg|gif|png)$/)
                ? asset.items[0].address
                : asset.previews && asset.previews[0].address?.match(/\.(jpeg|jpg|gif|png)$/)
                ? asset.previews[0].address
                : '/ethShanghai.png'
            }
            alt="asset-item"
          />
        </div>

        {/* title */}
        <div className="h-[20px] w-[120px] text-sm overflow-hidden text-ellipsis my-[5px]">{asset.name}</div>
      </div>
    </>
  )
}

export default Asset
