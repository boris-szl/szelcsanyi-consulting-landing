import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Work } from '@/pages/Work'
import { WorkDetail } from '@/pages/WorkDetail'
import { About } from '@/pages/About'
import { Roles } from '@/pages/Roles'
import { RoleDetail } from '@/pages/RoleDetail'
import { Blog } from '@/pages/Blog'
import { BlogPost } from '@/pages/BlogPost'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
          <Route path="hiring" element={<Roles />} />
          <Route path="hiring/:slug" element={<RoleDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
