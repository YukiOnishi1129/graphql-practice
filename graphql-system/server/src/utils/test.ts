/**
 * test logic
 * @package utils
 */
require("module-alias/register");
/* Services */
import { getMyUser } from "@Services/User";

const fetch = async () => {
  const data = await getMyUser(1);

  console.log("データ");
  console.log(data);
};

fetch();
