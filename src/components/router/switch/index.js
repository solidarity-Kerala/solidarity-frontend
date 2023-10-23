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
import FoodExchangeCategory from "../../private/pages/mealSettings/foodExchangeCategory";
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
import FoodExchangeData from "../../private/pages/Calories/foodExchangeData";
import AvailableSizes from "../../private/pages/Calories/availableSizes";
import DietPrice from "../../private/pages/Calories/dietPrice";
import Incredientmedicalcondition from "../../private/pages/Calories/Incredientmedicalcondition";
import DeliveryManLocation from "../../private/pages/dispatch/deliveryManLocation/index.js";

import DeliveryLocation from "../../private/pages/registrationSettings/DeliveryLocation";
import AddMeal from "../../private/pages/mealSettings/addMeal";
import Recipes from "../../private/pages/mealSettings/recipes";
import RecipeReport from "../../private/pages/report/recipeReport";

import BirthdayReport from "../../private/pages/report/birthdayReport";
import WeddingdayReport from "../../private/pages/report/weddingdayReport";
import NewPatientTodayReport from "../../private/pages/report/newPatientTodayReport";

import DietCentreBranch from "../../private/pages/registrationSettings/dietCentreBranch";
import ErrorLog from "../../private/pages/errorLog";
import IngredientReport from "../../private/pages/report/ingredientReport";

import RestoreDeliveryMan from "../../private/pages/restoreUser/restoreDeliveryMan";
import RestorePatient from "../../private/pages/restoreUser/restorePatient";
import RestoreDietitian from "../../private/pages/restoreUser/restoreDietitian";
import RestoreFranchiseAdmin from "../../private/pages/restoreUser/restoreFranchiseAdmin";
import Allergy from "../../private/pages/allergy";
import Inventory from "../../private/pages/inventory";
import UserLog from "../../private/pages/report/userLog";
// import FoodExchange from "../../private/pages/mealSettings/foodExchange";
import FoodExchange from "../../private/pages/mealSettings/foodExchange";

const Switch = ({ page, key, ...privileges }) => {
  switch (page) {
    case "login":
      return <Login key={key} />;
    case "menu":
      return <Menu key={key} {...privileges} />;
    case "franchise":
      return <Franchise key={key} {...privileges} />;
    case "recepe":
      return <Meal key={key} {...privileges} />;
    case "user-role":
      return <UserType key={key} {...privileges} />;
    case "user-list":
      return <UserList key={key} {...privileges} />;
    case "delivery-slot":
      return <DeliverySlot key={key} {...privileges} />;
    case "delivery-location":
      return <DeliveryLocation key={key} {...privileges} />;
    case "protein-category":
      return <ProteinCategory key={key} {...privileges} />;
    case "delivery-instruction":
      return <DeliveryInstruction key={key} {...privileges} />;
    case "type-of-diet":
      return <TypeOfDiet key={key} {...privileges} />;
    case "order-status":
      return <OrderStatus key={key} {...privileges} />;
    case "mealtime-category":
      return <MealTimeCategory key={key} {...privileges} />;
    case "food-exchange-category":
      return <FoodExchangeCategory key={key} {...privileges} />;
    case "foodexchange-data":
      return <FoodExchangeData key={key} {...privileges} />;
    case "recipe-tag":
      return <RecipeTag key={key} {...privileges} />;
    case "variant-group":
      return <VariantGroup key={key} {...privileges} />;
    case "variant-level":
      return <VaraiantLevel key={key} {...privileges} />;
    case "day-of-week":
      return <DayOfWeek key={key} {...privileges} />;
    case "aimof-program":
      return <AimOfProgram key={key} {...privileges} />;
    case "medical-condition":
      return <MedicalCondition key={key} {...privileges} />;
    case "foodlike-list":
      return <FoodlikeList key={key} {...privileges} />;
    case "fooddislike-list":
      return <FoodDislikeList key={key} {...privileges} />;
    case "addiction-list":
      return <AddictionList key={key} {...privileges} />;
    case "weekly-meal-plan":
      return <WeeklyMealPlan key={key} {...privileges} />;
    case "redeem-coupon":
      return <RedeemCoupen key={key} {...privileges} />;
    case "patient":
      return <Patient key={key} {...privileges} />;
    case "Cuisine-Category":
      return <CuisineCategory key={key} {...privileges} />;
    case "medication-list":
      return <MedicationList key={key} {...privileges} />;
    case "activeness-Status":
      return <ActivenessStatus key={key} {...privileges} />;
    case "package-management":
      return <PackageManagement key={key} {...privileges} />;
    case "discount-type":
      return <DiscountTypeName key={key} {...privileges} />;
    case "supplement":
      return <Supplement key={key} {...privileges} />;
    case "banner":
      return <Banner key={key} {...privileges} />;
    case "delivery-status":
      return <DeliveryStatus key={key} {...privileges} />;
    case "banner-type":
      return <BannerType key={key} {...privileges} />;
    case "meal-ingredient":
      return <MealIngredient key={key} {...privileges} />;
    case "recipe-ingredient":
      return <Ingredient key={key} {...privileges} />;
    case "dietitian":
      return <Dietitian key={key} {...privileges} />;
    case "delivery-man":
      return <Deliveryman key={key} {...privileges} />;
    case "add-recipe":
      return <AddRecipe key={key} {...privileges} />;
    case "vehicle-category":
      return <VehicleCategory key={key} {...privileges} />;
    case "admission-record":
      return <AdmissionRecord key={key} {...privileges} />;
    case "appointment":
      return <AppointmentHistory key={key} {...privileges} />;
    case "active-appointment":
      return <ActiveAppointment key={key} {...privileges} />;
    case "order-list":
      return <OrderList key={key} {...privileges} />;
    case "today-order":
      return <TodayOrder key={key} {...privileges} />;
    case "admission-history":
      return <AdmissionHistory key={key} {...privileges} />;
    case "dashboard":
      return <Dashboard key={key} {...privileges} />;
    case "blog":
      return <Blog key={key} {...privileges} />;
    case "subscriber":
      return <Subscriber key={key} {...privileges} />;
    case "blog-category":
      return <BlogCategory key={key} {...privileges} />;
    case "notification":
      return <Notification key={key} {...privileges} />;
    case "social-media":
      return <SocialMedia key={key} {...privileges} />;
    case "active-admission":
      return <ActiveAdmission key={key} {...privileges} />;
    case "page-settings":
      return <PageSettings key={key} {...privileges} />;
    case "weekly-meal-plan-entry":
      return <WeeklyMealPlanEntry key={key} {...privileges} />;
    case "admin":
      return <Admin key={key} {...privileges} />;
    case "students":
      return <Student key={key} {...privileges} />;
    case "faq":
      return <Faq key={key} {...privileges} />;
    case "tomorrow-order":
      return <TomorrowOrder key={key} {...privileges} />;
    case "food-group":
      return <AddMeal key={key} {...privileges} />;
    case "food-package":
      return <FoodPackage key={key} {...privileges} />;
    case "food-group-items":
      return <FoodGroupItems key={key} {...privileges} />;
    case "nationality":
      return <Nationality key={key} {...privileges} />;
    case "food-menu":
      return <FoodMenu key={key} {...privileges} />;
    case "recipe":
      return <Recipe key={key} {...privileges} />;
    case "variant":
      return <Variant key={key} {...privileges} />;
    case "day-slot":
      return <DaySlot key={key} {...privileges} />;
    case "package-orders":
      return <PackageOrder key={key} {...privileges} />;
    case "available-calories":
      return <AvailableCalories key={key} {...privileges} />;
    case "available-sizes":
      return <AvailableSizes key={key} {...privileges} />;
    case "diet-price":
      return <DietPrice key={key} {...privileges} />;
    case "incredient-medical-connection":
      return <Incredientmedicalcondition key={key} {...privileges} />;
    case "deliveryman-location":
      return <DeliveryManLocation key={key} {...privileges} />;
    case "recipes":
      return <Recipes key={key} {...privileges} />;
    case "recipe-report":
      return <RecipeReport key={key} {...privileges} />;
    case "birthday-report":
      return <BirthdayReport key={key} {...privileges} />;
    case "weddingday-report":
      return <WeddingdayReport key={key} {...privileges} />;
    case "new-patient-on-today":
      return <NewPatientTodayReport key={key} {...privileges} />;
    case "diet-centre-branch":
      return <DietCentreBranch key={key} {...privileges} />;
    case "error-log":
      return <ErrorLog key={key} {...privileges} />;
    case "ingredient-report":
      return <IngredientReport key={key} {...privileges} />;
    case "restore-delivery-man":
      return <RestoreDeliveryMan key={key} {...privileges} />;
    case "restore-patient":
      return <RestorePatient key={key} {...privileges} />;
    case "restore-dietitian":
      return <RestoreDietitian key={key} {...privileges} />;
    case "restore-franchise-admin":
      return <RestoreFranchiseAdmin key={key} {...privileges} />;
    case "allergy":
      return <Allergy key={key} {...privileges} />;
    case "inventory":
      return <Inventory key={key} {...privileges} />;
    case "subscriber-log":
      return <UserLog key={key} {...privileges} />;
    case "food-exchange":
      return <FoodExchange key={key} {...privileges} />;
    default:
      return <Page404 key={key}></Page404>;
  }
};

export default Switch;
