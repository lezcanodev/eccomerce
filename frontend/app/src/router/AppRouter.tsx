import { BrowserRouter, Route } from 'react-router-dom';
import { Outlet, Routes } from 'react-router';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ProductPublic from '../pages/ProductPublic';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ProductSelectCategory from '../pages/ProductSelectCategory';
import AdminRoute from './AdminRoute';
import Dashboard from '../pages/Dashboard';
import DashboardProduct from '../pages/DashboardProduct';
import DashboardCategory from '../pages/DashboardCategory';
import DashboardOrder from '../pages/DashboardOrder';
import DashboardConfiguration from '../pages/DashboardConfiguration';

export default () => (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Outlet />}>

            <Route
                element={<PublicRoute />}>

                <Route
                    path='/login'
                    element={<Signin />}
                />

                <Route
                    path='/register'
                    element={<Signup />}
                />

            </Route>


            <Route
                path='/'
                element={<AdminRoute/>}>

                <Route
                    path='/dashboard'
                    element={<Dashboard/>}
                >
                    <Route
                        path='config'
                        element={<>Congiuracion</>}
                    />

                    <Route
                        path='product'
                        element={<DashboardProduct />}
                    />

                    <Route
                        path='category'
                        element={<DashboardCategory />}
                    />

                    <Route              
                        path='order'
                        element={<DashboardOrder />}
                    />

                    <Route
                        path='configuration'
                        element={<DashboardConfiguration />}
                    />

                    <Route
                        path='product/category'
                        element={<ProductSelectCategory />}
                    />

                    <Route
                        path='product/public'
                        element={<ProductPublic />}
                    />
                </Route>

                

            </Route>

            <Route
                element={<PrivateRoute />}>
                


            </Route>



            <Route 
                path='*'
                element={<>Not found!!</>}
            />
        </Route>
       
      </Routes>
    </BrowserRouter>
)