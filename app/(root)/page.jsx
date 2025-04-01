import Icons from "@/components/pages/root/icons";
import NewsRew from "@/components/pages/root/news-rew";
import OurLicenses from "@/components/pages/root/our-licenses";
import Partners from "@/components/pages/root/partners";
import AllCategories from "@/components/shared/allCategories";
import AllProducts from "@/components/shared/allProducts";
import Banner from "@/components/shared/banner";
import { getData } from "@/lib/api.services";
import { getLastItems, getRandomItems } from "@/lib/utils";
import { Suspense } from "react";

async function Home() {
  const [
    products,
    categories,
    topCategories,
    sertificate,
    license,
    partner,
    newsData,
    reviews,
    currency,
    banner,
    bannerSort,
  ] = await Promise.all([
    getData("/api/product", "product"),
    getData("/api/category", "category"),
    getData("/api/topCategory", "topCategory"),
    getData("/api/sertificate", "sertificate"),
    getData("/api/license", "license"),
    getData("/api/partner", "partner"),
    getData("/api/news", "news"),
    getData("/api/selectReview", "selectReview"),
    getData("/api/currency", "currency"),
    getData("/api/banner", "banner"),
    getData("/api/bannerSort", "banner"),
  ]);

  const randomLicense = getRandomItems(license);
  const lastProducts = getLastItems(products, 4);
  const lastNews = getLastItems(newsData, 10);

  return (
    <div className="min-h-[50%] w-full flex flex-col space-y-2 items-center justify-center">
      <Banner banner={banner} bannerSort={bannerSort} />
      <div className="w-full space-y-6">
        <AllCategories categories={categories} topCategories={topCategories} />
        <AllProducts
          products={lastProducts}
          categories={categories}
          currency={currency}
          topCategories={topCategories}
        />
        <Icons />
        <OurLicenses sertificate={sertificate} license={randomLicense} />
        <Partners partner={partner} />
        <NewsRew newsItem={lastNews} reviews={reviews} />
      </div>
    </div>
  );
}

export default Home;
