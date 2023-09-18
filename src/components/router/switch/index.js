import React from "react";
import Menu from "../../private/pages/menu";
import Franchise from "../../private/pages/franchise";
import Login from "../../public/login";
import Page404 from "../../private/pages/page404";
import Meal from "../../private/pages/meal";
import UserType from "../../private/pages/user/userType";
import OrderStatus from "../../private/pages/dispatch/orderStatus";
import UserList from "../../private/pages/user/userList";
import ProteinCategory from "../../private/pages/mealSettings/proteinCategory";
import MealTimeCategory from "../../private/pages/mealSettings/mealTimeCategory";
// import RecipeTag from "../../private/pages/mealSettings/RecipeTag";
import VariantGroup from "../../private/pages/mealSettings/variantGroup";
import VaraiantLevel from "../../private/pages/mealSettings/varaiantLevel";
import DayOfWeek from "../../private/pages/mealSettings/dayOfWeek";
import AimOfProgram from "../../private/pages/registrationSettings/aimOfProgram";
import MedicalCondition from "../../private/pages/registrationSettings/medicalCondition";
import FoodlikeList from "../../private/pages/registrationSettings/foodlikeList";
import FoodDislikeList from "../../private/pages/registrationSettings/foodDislikeList";
import AddictionList from "../../private/pages/registrationSettings/addictionList";
import DeliverySlot from "../../private/pages/dispatch/deliverySlot";
import DeliveryInstruction from "../../private/pages/dispatch/deliveryInstruction";
import TypeOfDiet from "../../private/pages/diet/typeOfDiet";
import WeeklyMealPlan from "../../private/pages/mealSettings/weeklyMealPlan";
import RedeemCoupen from "../../private/pages/dispatch/redeemCoupon";
import Patient from "../../private/pages/user/patient";
import MedicationList from "../../private/pages/registrationSettings/medicationList";
import PackageManagement from "../../private/pages/packageManagement";
import Supplement from "../../private/pages/registrationSettings/supplement";
import DeliveryStatus from "../../private/pages/dispatch/deliveryStatus";
import CuisineCategory from "../../private/pages/mealSettings/cuisineCategory";
import ActivenessStatus from "../../private/pages/registrationSettings/activenessStatus";
import DiscountTypeName from "../../private/pages/dispatch/discountType";
import Banner from "../../private/pages/banner/banner";
import BannerType from "../../private/pages/banner/bannerType";
import MealIngredient from "../../private/pages/mealSettings/mealIngredient";
import Dietitian from "../../private/pages/user/dietitian";
import Deliveryman from "../../private/pages/dispatch/deliveryman";
import Ingredient from "../../private/pages/mealSettings/Ingredient/ingredient";
import VehicleCategory from "../../private/pages/dispatch/vechileCategory";
import AdmissionRecord from "../../private/pages/user/admissionRecord/admissionRecord";
// import AddVariant from "../../private/pages/mealSettings/addVariant";
import AppointmentHistory from "../../private/pages/user/appointment/appointmentHistory";
import ActiveAppointment from "../../private/pages/user/appointment/activeAppointment";
import OrderList from "../../private/pages/order/orderList";
import TodayOrder from "../../private/pages/order/todayOrder";
import AdmissionHistory from "../../private/pages/user/admissionHistory/admissionHistory";
import ActiveAdmission from "../../private/pages/user/admissionHistory/activeAdmission";
import Dashboard from "../../private/pages/dashboard";
import Subscriber from "../../private/pages/package/subscriber";
import Notification from "../../private/pages/notification/notification";
import Blog from "../../private/pages/blog/blogs";
import BlogCategory from "../../private/pages/blog/blogCategory";
import SocialMedia from "../../private/pages/socialPlugins/socialMedia";
import PageSettings from "../../private/pages/settings/pageSettings";
// import WeeklyMealPlanEntry from "../../private/pages/mealSettings/weeklyMealPlanEntry";
import Admin from "../../private/pages/franchise/admin";
import Student from "../../private/pages/user/student/student";
import WeeklyMealPlanEntry from "../../private/pages/mealSettings/weeklyMealPlanEntry/weeklyMealPlanEntry";
import Faq from "../../private/pages/socialPlugins/faq";
import TomorrowOrder from "../../private/pages/order/tomorrowOrder";
import FoodPackage from "../../private/pages/mealSettings/foodPackage/foodPackage";
import FoodGroupItems from "../../private/pages/mealSettings/foodGroupItems/foodGroupItems";
import Nationality from "../../private/pages/registrationSettings/nationality";
import FoodMenu from "../../private/pages/mealSettings/foodMenu";
import Recipe from "../../private/pages/mealSettings/recipe/recipe";
import Variant from "../../private/pages/recipe/variant";
import RecipeTag from "../../private/pages/mealSettings/recipeTag/recipeTag";
import AddRecipe from "../../private/pages/mealSettings/addRecipe";
import DaySlot from "../../private/pages/daySlot";
import PackageOrder from "../../private/pages/order/packageOrder";
import AvailableCalories from "../../private/pages/Calories/availableCalories";
import AvailableSizes from "../../private/pages/Calories/availableSizes";
import DietPrice from "../../private/pages/Calories/dietPrice";
import Incredientmedicalcondition from "../../private/pages/Calories/Incredientmedicalcondition";
import DeliveryManLocation from "../../private/pages/dispatch/deliveryManLocation/index.js";

import DeliveryLocation from "../../private/pages/registrationSettings/DeliveryLocation";
import AddMeal from "../../private/pages/mealSettings/addMeal";
import Recipes from "../../private/pages/mealSettings/recipes";
import RecipeReport from "../../private/pages/report/recipeReport";
import RecipeMealTimeCategory from "../../private/pages/report/recipeMealTimeCategory";

import BirthdayReport from "../../private/pages/report/birthdayReport";
import WeddingdayReport from "../../private/pages/report/weddingdayReport";
import NewPatientTodayReport from "../../private/pages/report/newPatientTodayReport";

import DietCentreBranch from "../../private/pages/registrationSettings/dietCentreBranch";
import ErrorLog from "../../private/pages/errorLog";
import IngredientReport from "../../private/pages/report/ingredientReport";
import UserDeletion from "../../private/pages/report/userDeletion";
import RestoreDeliveryMan from "../../private/pages/restoreUser/restoreDeliveryMan";
import RestorePatient from "../../private/pages/restoreUser/restorePatient";
import RestoreDietitian from "../../private/pages/restoreUser/restoreDietitian";
import RestoreFranchiseAdmin from "../../private/pages/restoreUser/restoreFranchiseAdmin";
/**
 * Switch component to render different pages based on the provided page prop.
 * @param {string} page - The page to be rendered.
 * @param {string} key - The key prop for React's list reconciliation.
 * @param {boolean} addPrivilege - Flag indicating whether the user has add privilege.
 * @param {boolean} delPrivilege - Flag indicating whether the user has delete privilege.
 * @param {boolean} updatePrivilege - Flag indicating whether the user has update privilege.
 * @returns {JSX.Element} - The JSX element representing the rendered page.
 */

const Switch = ({
  page,
  key,
  addPrivilege = false,
  delPrivilege = false,
  updatePrivilege = false,
  exportPrivilege = false,
}) => {
  switch (page) {
    case "login":
      return <Login key={key} />;
    case "menu":
      return (
        <Menu
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "franchise":
      return (
        <Franchise
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );

    // return (
    //   <Franchise
    //     key={key}
    //     exportPrivilege={exportPrivilege}
    //     addPrivilege={addPrivilege}
    //     delPrivilege={delPrivilege}
    //     updatePrivilege={updatePrivilege}
    //   />
    // );
    // MEAL IS A RECIPE //
    case "recepe":
      return (
        <Meal
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "user-role":
      return (
        <UserType
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "user-list":
      return (
        <UserList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "delivery-slot":
      return (
        <DeliverySlot
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "delivery-location":
      return (
        <DeliveryLocation
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "protein-category":
      return (
        <ProteinCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "delivery-instruction":
      return (
        <DeliveryInstruction
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    // return (
    //   <DeliveryInstruction
    //     key={key}
    //     exportPrivilege={exportPrivilege}
    //     addPrivilege={addPrivilege}
    //     delPrivilege={delPrivilege}
    //     updatePrivilege={updatePrivilege}
    //   />
    // );
    // TYPE OF DIET IS A DIET //
    case "type-of-diet":
      return (
        <TypeOfDiet
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "order-status":
      return (
        <OrderStatus
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "mealtime-category":
      return (
        <MealTimeCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipe-tag":
      return (
        <RecipeTag
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "variant-group":
      return (
        <VariantGroup
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "variant-level":
      return (
        <VaraiantLevel
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "day-of-week":
      return (
        <DayOfWeek
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "aimof-program":
      return (
        <AimOfProgram
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "medical-condition":
      return (
        <MedicalCondition
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "foodlike-list":
      return (
        <FoodlikeList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "fooddislike-list":
      return (
        <FoodDislikeList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "addiction-list":
      return (
        <AddictionList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "weekly-meal-plan":
      return (
        <WeeklyMealPlan
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "redeem-coupon":
      return (
        <RedeemCoupen
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "patient":
      return (
        <Patient
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "Cuisine-Category":
      return (
        <CuisineCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "medication-list":
      return (
        <MedicationList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "activeness-Status":
      return (
        <ActivenessStatus
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "package-management":
      return (
        <PackageManagement
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "discount-type":
      return (
        <DiscountTypeName
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "supplement":
      return (
        <Supplement
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "banner":
      return (
        <Banner
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "delivery-status":
      return (
        <DeliveryStatus
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "banner-type":
      return (
        <BannerType
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "meal-ingredient":
      return (
        <MealIngredient
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipe-ingredient":
      return (
        <Ingredient
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "dietitian":
      return (
        <Dietitian
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "delivery-man":
      return (
        <Deliveryman
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "add-recipe":
      return (
        <AddRecipe
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "vehicle-category":
      return (
        <VehicleCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "admission-record":
      return (
        <AdmissionRecord
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    // case "add-variant":
    //   return (
    //     <AddVariant
    //       key={key} exportPrivilege={exportPrivilege}
    //       addPrivilege={addPrivilege}
    //       delPrivilege={delPrivilege}
    //       updatePrivilege={updatePrivilege}
    //     />
    //   );
    case "appointment":
      return (
        <AppointmentHistory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "active-appointment":
      return (
        <ActiveAppointment
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "order-list":
      return (
        <OrderList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "today-order":
      return (
        <TodayOrder
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "admission-history":
      return (
        <AdmissionHistory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "dashboard":
      return (
        <Dashboard
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "blog":
      return (
        <Blog
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "subscriber":
      return (
        <Subscriber
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "blog-category":
      return (
        <BlogCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "notification":
      return (
        <Notification
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );

    case "social-media":
      return (
        <SocialMedia
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "active-admission":
      return (
        <ActiveAdmission
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "page-settings":
      return (
        <PageSettings
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "weekly-meal-plan-entry":
      return (
        <WeeklyMealPlanEntry
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "admin":
      return (
        <Admin
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "students":
      return (
        <Student
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "faq":
      return (
        <Faq
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "tomorrow-order":
      return (
        <TomorrowOrder
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    // return (
    //   <TomorrowOrder
    //     key={key}
    //     exportPrivilege={exportPrivilege}
    //     addPrivilege={addPrivilege}
    //     delPrivilege={delPrivilege}
    //     updatePrivilege={updatePrivilege}
    //   />
    // );
    // FOOD GROUP IS A MEAL //
    case "food-group":
      return (
        <AddMeal
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "food-package":
      return (
        <FoodPackage
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "food-group-items":
      return (
        <FoodGroupItems
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "nationality":
      return (
        <Nationality
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "food-menu":
      return (
        <FoodMenu
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipe":
      return (
        <Recipe
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "variant":
      return (
        <Variant
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "day-slot":
      return (
        <DaySlot
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "package-orders":
      return (
        <PackageOrder
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "available-calories":
      return (
        <AvailableCalories
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "available-sizes":
      return (
        <AvailableSizes
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "diet-price":
      return (
        <DietPrice
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "incredient-medical-connection":
      return (
        <Incredientmedicalcondition
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "deliveryman-location":
      return (
        <DeliveryManLocation
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipes":
      return (
        <Recipes
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipe-report":
      return (
        <RecipeReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "recipe-mealtimecategory":
      return (
        <RecipeMealTimeCategory
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );

    case "birthday-report":
      return (
        <BirthdayReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "weddingday-report":
      return (
        <WeddingdayReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "new-patient-on-today":
      return (
        <NewPatientTodayReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "diet-centre-branch":
      return (
        <DietCentreBranch
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "error-log":
      return (
        <ErrorLog
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "ingredient-report":
      return (
        <IngredientReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "user-deletion":
      return (
        <UserDeletion
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "restore-delivery-man":
      return (
        <RestoreDeliveryMan
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "restore-patient":
      return (
        <RestorePatient
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "restore-dietitian":
      return (
        <RestoreDietitian
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "restore-franchise-admin":
      return (
        <RestoreFranchiseAdmin
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    default:
      return <Page404 key={key}></Page404>;
  }
};

export default Switch;
