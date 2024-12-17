import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
// import { useLoginMutation } from '../redux/apis/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useLoginMutation } from '../redux/authApi';

const Login = () => {
    const { user } = useSelector(state => state.auth);
    const [login, { data, isSuccess, isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email format").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            login(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User login successful");
            navigate("/");
           
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.message || "Unable to login user");
        }
    }, [isError]);
    

    // useEffect(() => {
    //     if (user) {
    //         if (user.role === "admin") {
    //             navigate("/admin");
    //         } else if (user.role === "customer") {
    //             navigate("/");
    //         }
    //     }
    // }, [user]);

    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900'>
            <motion.div
                className="card card-compact w-full max-w-md p-8 shadow-lg bg-white rounded-xl"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                                "Login"
                            )}
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => navigate("/register")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Register here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
