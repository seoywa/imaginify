import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { getImageSize, dataUrl, debounce } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

const TransformedImage = ({
  image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false
}: TransformedImageProps) => {
  const downloadHander = () => {}
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex-between'>
        <h3 className='h3-bold text-dark-600'>
          Tranformed
        </h3>

        {hasDownload && (
          <Button className='download-btn' onClick={downloadHander}>
            <Image src={'/assets/icons/download.svg'} alt='download' height={24} width={24} className='pb-[6px]' />
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className='relative'>
          <CldImage 
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setIsTransforming &&  setIsTransforming(false)
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className='transforming-loader'>
            </div>
          )}
        </div>
      ) : (
        <div className='transform-placeholder'>
          Transformed Image
        </div>
      )}
    </div>
  )
}

export default TransformedImage