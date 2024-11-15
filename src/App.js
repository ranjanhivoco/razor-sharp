import { ThemeProvider } from "./context/Themes";
import { Suspense, lazy } from "react";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import Protected from "./Protected";
import AbundantUsers from "./pages/master/AbundantUsers";
import CustomerQuestion from "./pages/master/CustomerQuestion";
import Branch from "./pages/master/Branch";
import Customer from "./pages/master/Customer";
import UpSelling from "./pages/master/UpSelling.js";
import { Chart } from "react-chartjs-2";
import { ProviderDate } from "./components/context/date.js";
import { BranchProvider } from "./components/context/branch.js";
import ThreeStepProcess from "./pages/master/ThreeStepProcess.js";
const Admin = lazy(() => import("./pages/master/Admin"));
const Ecommerce = lazy(() => import("./pages/master/Ecommerce"));
const ForgotPassword = lazy(() => import("./pages/master/ForgotPassword"));
const Register = lazy(() => import("./pages/master/Register"));
const Login = lazy(() => import("./pages/master/Login"));
const UserList = lazy(() => import("./pages/master/UserList"));
const UserProfile = lazy(() => import("./pages/master/UserProfile"));
const MyAccount = lazy(() => import("./pages/master/MyAccount"));
const InventoryList = lazy(() => import("./pages/master/InventoryList"));
const ProductView = lazy(() => import("./pages/master/ProductView"));
const ProductUpload = lazy(() => import("./pages/master/ProductUpload"));
const InvoiceList = lazy(() => import("./pages/master/InvoiceList"));
const InvoiceDetails = lazy(() => import("./pages/master/InvoiceDetails"));
const OrderList = lazy(() => import("./pages/master/OrderList"));
const Coupons = lazy(() => import("./pages/master/Coupons"));
const Message = lazy(() => import("./pages/master/Message"));
const Notification = lazy(() => import("./pages/master/Notification.jsx"));
const BlankPage = lazy(() => import("./pages/master/BlankPage"));
const OtpVerification = lazy(() => import("./pages/master/OtpVerification"));
const Settings = lazy(() => import("./pages/master/Settings"));
const ResetPassword = lazy(() => import("./pages/master/ResetPassword"));
const Dropshippers = lazy(() => import("./pages/master/Dropshippers"));
const Category = lazy(() => import("./pages/master/Category"));
const SubCategory = lazy(() => import("./pages/master/SubCategory"));
const SellerRequest = lazy(() => import("./pages/master/SellerRequest"));
const SellerView = lazy(() => import("./pages/master/SellerView"));
const Brand = lazy(() => import("./pages/master/Brand"));
const Attributes = lazy(() => import("./pages/master/Attributes"));
const BrandRequest = lazy(() => import("./pages/master/BrandRequest"));
const Faq = lazy(() => import("./pages/master/Faq"));
const FaqCategory = lazy(() => import("./pages/master/FaqCategory"));
const Newsletter = lazy(() => import("./pages/master/Newsletter"));
const Reports = lazy(() => import("./pages/master/Reports"));
const HomepageCards = lazy(() => import("./pages/master/HomepageCards"));
const ContactUs = lazy(() => import("./pages/master/ContactUs"));
const ContactView = lazy(() => import("./pages/master/ContactView"));
const Blogs = lazy(() => import("./pages/master/Blogs"));
const AddBlog = lazy(() => import("../src/components/elements/AddBlogPopup"));
const EditBlog = lazy(() => import("../src/components/elements/EditBlogPopup"));
const BulkOrderRequest = lazy(() => import("./pages/master/BulkOrderRequest"));
const BulkOrderView = lazy(() => import("./pages/master/BulkRequestView"));
const FeaturedProduct = lazy(() => import("./pages/master/FeaturedProducts"));
const ExclusiveProduct = lazy(() => import("./pages/master/ExclusiveProducts"));
const DealOfTheDay = lazy(() => import("./pages/master/DealOfTheDay"));
const TopRatedProduct = lazy(() => import("./pages/master/TopRatedProducts"));
const BestSeller = lazy(() => import("./pages/master/BestSeller"));
const FindinFast = lazy(() => import("./pages/master/FindinFastCategory"));
const RatingReview = lazy(() => import("./pages/master/RatingReview"));
const ReturnList = lazy(() => import("./pages/master/ReturnList"));
const ReturnView = lazy(() => import("./pages/master/ReturnView"));
const ForumPost = lazy(() => import("./pages/master/ForumPost"));
const ForumCategory = lazy(() => import("./pages/master/ForumCategory"));
const ForumSubcategory = lazy(() => import("./pages/master/ForumSubcategory"));
const AddForumPost = lazy(() =>
  import("../src/components/elements/AddForumPostPopup")
);
const EditForumPost = lazy(() =>
  import("../src/components/elements/EditForumPostPopup")
);
const CustomerQuestionView = lazy(() =>
  import("./pages/master/CustomerQuestionView")
);

export default function App() {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <BranchProvider>
          <ProviderDate>
            <BrowserRouter>
              <Routes>
                {/* master Pages */}
                {/* <Route
                path="/admin"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    {/* <Protected> */}
                {/* <Admin /> */}
                {/* </Protected> */}
                {/* </Suspense> */}
                {/* }
              /> */}
                {/* <Route
                path="/rating-review"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <RatingReview />
                    </Protected>
                  </Suspense>
                }
              />


   

              <Route
                path="/register"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Register />
                  </Suspense>
                }
              />
              <Route
                path="/register/otp-verification"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <OtpVerification />
                  </Suspense>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <ForgotPassword />
                  </Suspense>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <ResetPassword />
                  </Suspense>
                }
              />
              <Route
                path="/user-list"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <UserList />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/abundant-cart-user"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <AbundantUsers />
                    </Protected>
                  </Suspense>
                }
              />

              <Route
                path="/user-profile"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <UserProfile />
                    </Protected>
                  </Suspense>
                }
              />

              <Route
                path="/dropshippers"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Dropshippers />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/product-view"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ProductView />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/product-upload"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ProductUpload />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/invoice-list"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <InvoiceList />
                    </Protected>
                  </Suspense>
                }
                  
              /> */}
                {/* <Route
                path="/invoice-details"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                    <InvoiceDetails />
                    </Protected>
                  </Suspense>
                }
              /> */}
                {/* 
              <Route
                path="/my-account"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <MyAccount />
                    </Protected>
                  </Suspense>
                }
              /> */}
                {/* <Route
                path="/contactView"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ContactView />
                    </Protected>
                  </Suspense>
                }
              /> */}
                <Route
                  path="/order-list"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      {/* <Protected> */}
                      <OrderList />
                      {/* </Protected> */}
                    </Suspense>
                  }
                />
                {/* <Route
                path="/return-replace"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ReturnList />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/return-details"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ReturnView />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/coupons"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Coupons />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/category"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Category />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/seller-view"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <SellerView />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/questionview"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <CustomerQuestionView />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ContactUs />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/homepage-cards"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <HomepageCards />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/reports"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Reports />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/newsletter-subscriber"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Newsletter />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/faq"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Faq />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/faq-category"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <FaqCategory />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/brand-request"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <BrandRequest />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/add-Brand"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Brand />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/sub-Category"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <SubCategory />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="attributes"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Attributes />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/dropshipper-request"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <SellerRequest />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/message"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Message />
                  </Suspense>
                }
              />
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Settings />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/blank-page"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <BlankPage />
                  </Suspense>
                }
              />
              <Route
                path="/blog"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <Blogs />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/add-blog"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <AddBlog />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/edit-blog"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <EditBlog />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/bulk-order-list"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <BulkOrderRequest />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/bulk-order-view"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <BulkOrderView />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/featured-products"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <FeaturedProduct />
                    </Protected>
                  </Suspense>
                }
              />

              <Route
                path="/exclusive-products"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ExclusiveProduct />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/deal-of-the-day"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <DealOfTheDay />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/top-rated-products"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <TopRatedProduct />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/best-seller"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <BestSeller />
                    </Protected>
                  </Suspense>
                }
              />

              <Route
                path="/find-in-fast"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <FindinFast />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/forum-post"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ForumPost />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/forum-category"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ForumCategory />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/forum-subcategory"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <ForumSubcategory />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/customer-question"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <CustomerQuestion />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/add-post"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <AddForumPost />
                    </Protected>
                  </Suspense>
                }
              />
              <Route
                path="/edit-post"
                element={
                  <Suspense fallback={<LoaderProvider />}>
                    <Protected>
                      <EditForumPost />
                    </Protected>
                  </Suspense>
                }
              /> */}
                {/* Blocks Pages */}
                {/* <Route path="/headings" element={<Headings />} />
              <Route path="/buttons" element={<Buttons />} /> */}
                {/* <Route path="/avatars" element={<Avatars />} /> */}
                {/* <Route path="/colors" element={<Colors />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/fields" element={<Fields />} /> */}
                {/* <Route path="/alerts" element={<Alerts />} /> */}
                <Route
                  path="/notification"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      {/* <Protected> */}
                      <Notification />
                      {/* </Protected> */}
                    </Suspense>
                  }
                />
                <Route
                  path="/inventory-list"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <InventoryList />
                    </Suspense>
                  }
                />
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Protected>
                        <Ecommerce />
                      </Protected>
                    </Suspense>
                  }
                />
                <Route
                  path="/branch"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Protected>
                        <Branch />
                      </Protected>
                    </Suspense>
                  }
                />
                <Route
                  path="/customer"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Protected>
                        <Customer />
                      </Protected>
                    </Suspense>
                  }
                />
                <Route
                  path="/upselling-items"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Protected>
                        <UpSelling />
                      </Protected>
                    </Suspense>
                  }
                />
                <Route
                  path="/chart"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Protected>
                        <Chart />
                      </Protected>
                    </Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="/message"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      <Message />
                    </Suspense>
                  }
                />
                <Route
                  path="/3-step-process"
                  element={
                    <Suspense fallback={<LoaderProvider />}>
                      {/* <Message /> */}
                      <ThreeStepProcess />
                    </Suspense>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ProviderDate>
        </BranchProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}
