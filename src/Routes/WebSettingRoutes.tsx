import { Route } from "react-router-dom";
import {
  Brandings,
  NewsUpdate,
  WebsiteSettings,
} from "../Pages/WebsiteSettings";

export const WebSettingRoutes = (
  <>
    <Route path="/website/brandings" element={<Brandings />} />
    <Route path="/website/settings" element={<WebsiteSettings />} />
    <Route path="/website/news-update" element={<NewsUpdate />} />
  </>
);
