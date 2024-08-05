"use client"

import { creditFee } from '@/constants'
import { updateCredits } from '@/lib/actions/user.actions'
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { useTransition } from 'react'

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming ,
  setIsTransforming,
  hasDownload = false,
  userId
} : TransformedImageProps) => {
  
  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title);
  }
  
  const [isPending, startTransition] = useTransition();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex-between'>
        <h3 className='h3-bold text-dark-600'>
          Transformed
        </h3>

        {hasDownload && (
          <button 
            className='download-btn'
            onClick={downloadHandler}
          >
            <Image
              src='/assets/icons/download.svg'
              alt='download'
              width={24}
              height={24}
              className='pb [6px]'
            />        
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className='relative'>
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image.publicId}
            alt={image.title || 'title'}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className='transformed-image'
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
              startTransition(async() => {
                await updateCredits(userId, creditFee);
              });
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)()
              alert("Error generating the image");
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className='transforming-loader'>
              <Image
                src='/assets/icons/spinner.svg'
                width={50}
                height={50}
                alt='spinner'
              />
              <p className='text-white/80'>Please wait</p>
            </div>
          )}
        </div>
      ) : (
        <div className='transformed-placeholder'>
          Transformed image
        </div>
      )}
    </div>
  )
}

export default TransformedImage