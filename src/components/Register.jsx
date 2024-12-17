import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
// import { useRegisterMutation } from '';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '../redux/authApi';

const Register = () => {
    const [Register, { isSuccess, isLoading, isError, error }] = useRegisterMutation();
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email("Invalid email format").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            Register(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User registered successfully");
            navigate("/login");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.message || "Unable to register user");
        }
    }, [isError]);

    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900'>
            <motion.div
                className="card card-compact w-full max-w-md p-8 shadow-lg bg-white rounded-xl"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <input
                                {...formik.getFieldProps("name")}
                                type="text"
                                placeholder="Enter Name"
                                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${formik.errors.name && formik.touched.name && "border-red-500"}`}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <input
                                {...formik.getFieldProps("email")}
                                type="email"
                                placeholder="Enter Email"
                                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${formik.errors.email && formik.touched.email && "border-red-500"}`}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <input
                                {...formik.getFieldProps("password")}
                                type="password"
                                placeholder="Enter Password"
                                className={`input input-bordered w-full p-3 rounded-md border-gray-300 ${formik.errors.password && formik.touched.password && "border-red-500"}`}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <button
                            disabled={isLoading}
                            type='submit'
                            className='btn btn-primary w-full py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition'
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center space-x-2'>
                                    <div className='loading loading-spinner'></div>
                                    <span>Verifying, please wait...</span>
                                </div>
                            ) : (
                                "Register"
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Login here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
