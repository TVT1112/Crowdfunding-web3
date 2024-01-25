import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ethers} from 'ethers'//cho phép tương tác với smart ctract

import {useStateContext} from '../context'
import {money} from '../assets' 
import {CustomButton,FormField} from '../components'
import {checkIfImage} from '../utils'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {createCampaign} = useStateContext();
  //những data cần để tạo campaign
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
    
  }
  
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
       {isLoading && 'loader...'}
       <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Bắt đầu 1 chiến dịch</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]" >
        <div className="flex flex-wrap gap-[40px]">
        <FormField 
            labelName="Tên của bạn *"
            placeholder="Thái văn tuấn"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Tiêu đề *"
            placeholder="Viết 1 tiêu đề"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />  
        </div>
        <FormField 
            labelName="Câu chuyện *"
            placeholder="Viết câu chuyện của bạn"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Bạn sẽ nhận được 100% số tiền quyên góp được</h4>
        </div>


        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Mục tiêu *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="Ngày kết thúc *"
            placeholder="Hạn nộp"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Ảnh chiến dịch *"
            placeholder="Đăng tải URL ảnh của bạn"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Xác nhận chiến dịch của bạn"
              styles="bg-[#1dc071]"
            />
          </div>

      </form>
      
    </div>
  )
}

export default CreateCampaign