// // src/Routes.jsx
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './components/Login';
// import Signup from './pages/Signup';
// import AllPosts from './pages/AllPosts';
// import AddPost from './pages/AddPost';
// import EditPost from './pages/EditPost';
// import Post from './pages/Post';
// import { AuthLayout } from './components';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route 
//         path="/login" 
//         element={
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         } 
//       />
//       <Route 
//         path="/signup" 
//         element={
//           <AuthLayout authentication={false}>
//             <Signup />
//           </AuthLayout>
//         } 
//       />
//       <Route 
//         path="/all-posts" 
//         element={
//           <AuthLayout authentication={true}>
//             <AllPosts />
//           </AuthLayout>
//         } 
//       />
//       <Route 
//         path="/add-post" 
//         element={
//           <AuthLayout authentication={true}>
//             <AddPost />
//           </AuthLayout>
//         } 
//       />
//       <Route 
//         path="/edit-post/:slug" 
//         element={
//           <AuthLayout authentication={true}>
//             <EditPost />
//           </AuthLayout>
//         } 
//       />
//       <Route path="/post/:slug" element={<Post />} />
//     </Routes>
//   );
// };

// export default AppRoutes;