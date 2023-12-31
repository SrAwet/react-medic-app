import React from 'react'
import { Navbar } from '../components/Navbar'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
//      http:localhost:8000/api/patients

    // const handleSubmit = (event) =>{
    //     event.preventDefault()

    //     const formData = new FormData(event.target)
    //     const name = formData.get('name')
    //     console.log(name);
    // }

    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()

    const onSubmit = async(data) => {
        try {
          
            const response = await fetch('http://localhost:8000/api/patients', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
            })

            const patient = await response.json()
            console.log(patient)
            navigate('/patients')

        } catch (error) {
           console.log("Esto es un error por si falla la API",error)
        }
    }

  return (
    <>
        <Navbar/>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl translate-y-6">
            <div className="md:flex">
                <div className='p-8 w-full'>
                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1"> Form to add patient</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            className='shadow appearance-none border border-slate-500 rounded w-full m-3 py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline' 
                            type="text" 
                            {...register("name", {required:true})} 
                            placeholder='Patient Name'
                        />
                        {errors.name && <span className='text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded'>This field is required</span>}

                        <input 
                            className='shadow appearance-none border border-slate-500 rounded w-full m-3 py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline' 
                            type="number" 
                            {...register("age", {required:true})}
                            placeholder='Patient Age'
                        />
                        {errors.age && <span className='text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded'>This field is required</span>}

                        <input 
                            className='shadow appearance-none border border-slate-500 rounded w-full m-3 py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline' 
                            type="number" 
                            {...register("num_afi", {required:true})} 
                            placeholder='Patient affiliation number' 
                        />
                        {errors.num_afi && <span className='text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded'>This field is required</span>}

                        <textarea className='shadow appearance-none border border-slate-500 rounded m-3 w-full py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline'
                            {...register("address", {required:true})}
                            id="" 
                            cols="30" 
                            rows="10"
                            placeholder='Patient Address'
                        ></textarea>
                        {errors.address && <span className='text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded'>This field is required</span>}
                        <br />
                        <br />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline' type='submit'>Add Patient</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreatePage