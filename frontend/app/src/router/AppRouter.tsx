import { Route } from 'react-router-dom';
import { createRoutesFromElements, Outlet } from 'react-router';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ProductPublic from '../pages/ProductPublic';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ProductSelectCategory from '../pages/ProductSelectCategory';
import AdminRoute from './AdminRoute';
import DashboardProduct from '../pages/DashboardProduct';
import DashboardCategory from '../pages/DashboardCategory';
import DashboardOrder from '../pages/DashboardOrder';
import DashboardConfiguration from '../pages/DashboardConfiguration';
import ProductEdit from '../pages/ProductEdit';
import { getProduct } from '../api/product';
import CategoryPublic from '../pages/CategoryPublic';
import CategoryEdit from '../pages/CategoryEdit';
import { getCategory } from '../api/category';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import Header from '../pages/layouts/Header';

const AppRoutes = createRoutesFromElements(
    <>
        <Route
                path='/'
                element={<Home/>}/>

        <Route
            element={<><Header/> <Outlet/></>}
        >

            <Route
                    path='/product/:productId'
                    element={<ProductPage />}
                    loader={async ({ params }) => {
                        const product = await getProduct(params.productId ?? '');
                        if(JSON.stringify(product) === '{}'){
                            return null;
                        }
                        return product;
                    }}
                />

        </Route>



        <Route
            element={<PublicRoute />}>

            <Route
                path='/login'
                element={<Signin />}
            />

            <Route
                element={<Signup />}
                path='/register'
            />

        </Route>



        <Route
            path='/dashboard'
            element={<AdminRoute/>}>
            
      
            <Route
                index
                element={<>Index dashboard</>}
            />

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

            <Route
                path='product/edit/:productId'
                element={<ProductEdit />}
                loader={async ({ params }) => {
                    const product = await getProduct(params.productId ?? '');
                    if(JSON.stringify(product) === '{}'){
                        return null;
                    }
                    return product;
                }}
            />


            <Route
                path='category/public'
                element={<CategoryPublic/>}
            />

            <Route
                path='category/edit/:categoryId'
                element={<CategoryEdit />}
                loader={async ({ params }) => {
                    const category = await getCategory(Number(params.categoryId));
                    if(JSON.stringify(category) === '{}'){
                        return null;
                    }
                    return category;
                }}
            />

        </Route>

        <Route
            element={<PrivateRoute />}>
        
        </Route>



        <Route 
            path='*'
            element={<>Not found!!</>}
        />
    </>
)

export default AppRoutes;
