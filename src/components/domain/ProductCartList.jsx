import ProductCart from "./ProductCart";
export default function ProductCartList() {

    const products = [
      {
      id: 1,
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "Asics x Jound GT-2160 ",
      description: "Lightly used, size 42.dfghjklsr rtry rtytryy ttryryhr try ryrtjhjd hsrty rtytrshshgu erhugreut ertyrguy ryyu ygyuug yur yur gyugfguyg",
      productPrice: 249,
    },
    {
      id: 2,
      imageUrl: "/images/product/av1.jpg",
      title: "ASICS Gel Nimbus 26",
      description: "No box, worn 3 times.",
      productPrice: 180,
      discountPercent: 15,
    },
    {
      id: 3,
      imageUrl: "/images/product/ck.jpg",
      title: "Men Gel-Cumulus",
      description: "In great condition.",
      productPrice: 75,
    },
    {
      id: 4,
      imageUrl: "/images/product/ck zoom.jpg",
      title: "cotton beige hoodies",
      description:
        "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      productPrice: 20,
      discountPercent: 10,
    },
    {
      id: 5,
      imageUrl: "/images/product/sbek jerng keng.jpg",
      title: "COTTON Beige hoodies",
      description:
        "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      productPrice: 20,
      discountPercent: 10,
    },
    {
      id: 6,
      imageUrl: "/images/product/lb_puff.jpg",
      title: "Cotton Beige hoodies",
      description:
        "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      productPrice: 20,
      discountPercent: 10,
    },
  ];

    return <>
    
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {products.map((item) => {
          let price;

          if (typeof item.productPrice === "number") {
            if (
              typeof item.discountPercent === "number" &&
              !isNaN(item.discountPercent)
            ) {
              price = (item.productPrice * (100 - item.discountPercent)) / 100;
            } else {
              price = item.productPrice;
            }
          } else {
            price = 0;
          }

          return (
            <ProductCart
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={price.toFixed(2)}
              originalPrice={item.discountPercent ? item.productPrice : null}
              discountText={
              item.discountPercent ? `${item.discountPercent}% OFF` : null
              }
            />
          );
        })}
        
      </div>


    </>;
}