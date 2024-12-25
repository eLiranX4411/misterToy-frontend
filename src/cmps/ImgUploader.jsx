import { useState } from 'react'
import { uploadService } from '../services/upload.service.js'
import { Loader } from './Loader.jsx'
import { updateUserImg } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'

export function ImgUploader() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [imgData, setImgData] = useState(user.imgUrl)
  const [isUploading, setIsUploading] = useState(false)

  console.log(user)

  async function uploadImg(ev) {
    ev.preventDefault()
    console.log('🚀 ~ uploadImg ~ ev:', ev)
    setIsUploading(true)

    const { secure_url } = await uploadService.uploadImg(ev)
    await updateUserImg({ ...user, imgUrl: secure_url })

    setImgData({ imgUrl: secure_url })
    setIsUploading(false)
  }

  function getUploadLabel() {
    if (imgData) return 'Change picture?'
    return isUploading ? <Loader /> : 'Upload Image'
  }

  return (
    <div>
      <div>{getUploadLabel()}</div>

      <label
        onDrop={uploadImg}
        // onDragOver={console.log}
        onDragOver={(ev) => ev.preventDefault()}
      >
        <img
          src={
            imgData ||
            'https://res.cloudinary.com/dv7uswhcz/image/upload/f_auto,q_auto/nersbxk6gursqfexji42'
          }
          style={{ width: '200px', height: '200px', cursor: 'pointer' }}
        />

        <input hidden type='file' onChange={uploadImg} accept='img/*' />
      </label>
    </div>
  )
}
