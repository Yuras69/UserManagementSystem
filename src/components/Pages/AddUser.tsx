import { axiosInstance as mockapi } from "../../API/mockapi"
import ProfileForm from "../shadcn-space/blocks/forms-01/profile-form"

const AddUser = () => {
  const onSubmit = async (data: any) => {
    console.log("submit", data)

    try {
      const response = await mockapi.post("hasina", data)
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <>
   <ProfileForm/>
    </>
  )
}

export default AddUser
