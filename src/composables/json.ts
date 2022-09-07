// json data
import title from "@/assets/json/title.json";
import constants from "@/assets/json/constants.json";
import image from "@/assets/json/image.json";
import swiper from "@/assets/json/swiper.json";
import table from "@/assets/json/table.json";
import contents from "@/assets/json/contents.json";

export const useJson = () => {
  return {
    title    : title,
    constants: constants,
    contents : contents,
    table    : table,
    image    : image,
    swiper   : swiper,
  }
}
