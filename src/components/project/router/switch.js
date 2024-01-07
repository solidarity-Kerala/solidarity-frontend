import React from "react";
import Menu from "../pages/menu/index.js";
import Franchise from "../pages/franchise/index.js";
import Login from "../../public/login/index.js";
import Page404 from "../pages/page404/index.js";
import Meal from "../pages/meal/index.js";
import UserType from "../pages/user/userType/index.js";
import OrderStatus from "../pages/dispatch/orderStatus/index.js";
import UserList from "../pages/user/userList/index.js";
import ProteinCategory from "../pages/mealSettings/proteinCategory/index.js";
import MealTimeCategory from "../pages/mealSettings/mealTimeCategory/index.js";
import VariantGroup from "../pages/mealSettings/variantGroup/index.js";
import VaraiantLevel from "../pages/mealSettings/varaiantLevel/index.js";
import DayOfWeek from "../pages/mealSettings/dayOfWeek/index.js";
import AimOfProgram from "../pages/registrationSettings/aimOfProgram/index.js";
import MedicalCondition from "../pages/registrationSettings/medicalCondition/index.js";
import FoodlikeList from "../pages/registrationSettings/foodlikeList/index.js";
import FoodDislikeList from "../pages/registrationSettings/foodDislikeList/index.js";
import AddictionList from "../pages/registrationSettings/addictionList/index.js";
import DeliverySlot from "../pages/dispatch/deliverySlot/index.js";
import DeliveryInstruction from "../pages/dispatch/deliveryInstruction/index.js";
import TypeOfDiet from "../pages/diet/typeOfDiet/index.js";
import WeeklyMealPlan from "../pages/mealSettings/weeklyMealPlan/index.js";
import RedeemCoupen from "../pages/dispatch/redeemCoupon/index.js";
import Patient from "../pages/user/patient/index.js";

import MedicationList from "../pages/registrationSettings/medicationList/index.js";
import PackageManagement from "../pages/packageManagement/index.js";
import Supplement from "../pages/registrationSettings/supplement/index.js";
import DeliveryStatus from "../pages/dispatch/deliveryStatus/index.js";
import CuisineCategory from "../pages/mealSettings/cuisineCategory/index.js";
import ActivenessStatus from "../pages/registrationSettings/activenessStatus/index.js";
import DiscountTypeName from "../pages/dispatch/discountType/index.js";
import Banner from "../pages/banner/banner/index.js";
import BannerType from "../pages/banner/bannerType/index.js";
import MealIngredient from "../pages/mealSettings/mealIngredient/index.js";
import Dietitian from "../pages/user/dietitian/index.js";
import Deliveryman from "../pages/dispatch/deliveryman/index.js";
import Ingredient from "../pages/mealSettings/Ingredient/ingredient.js";
import VehicleCategory from "../pages/dispatch/vechileCategory/index.js";
import AdmissionRecord from "../pages/user/admissionRecord/admissionRecord.js";
import AppointmentHistory from "../pages/user/appointment/appointmentHistory.js";
import ActiveAppointment from "../pages/user/appointment/activeAppointment.js";
import OrderList from "../pages/order/orderList.js";
import TodayOrder from "../pages/order/todayOrder.js";
import AdmissionHistory from "../pages/user/admissionHistory/admissionHistory.js";
import ActiveAdmission from "../pages/user/admissionHistory/activeAdmission.js";
import Dashboard from "../pages/dashboard/index.js";
import Subscriber from "../pages/package/subscriber.js";
import Notification from "../pages/notification/notification.js";
import Blog from "../pages/blog/blogs/index.js";
import BlogCategory from "../pages/blog/blogCategory/index.js";
import SocialMedia from "../pages/socialPlugins/socialMedia/index.js";
import PageSettings from "../pages/settings/pageSettings/index.js";
import Admin from "../pages/franchise/admin.js";
import Student from "../pages/user/student/student.js";
import WeeklyMealPlanEntry from "../pages/mealSettings/weeklyMealPlanEntry/weeklyMealPlanEntry.js";
import Faq from "../pages/socialPlugins/faq/index.js";
import TomorrowOrder from "../pages/order/tomorrowOrder.js";
import FoodPackage from "../pages/mealSettings/foodPackage/foodPackage.js";
import FoodGroupItems from "../pages/mealSettings/foodGroupItems/foodGroupItems.js";
import Nationality from "../pages/registrationSettings/nationality/index.js";
import FoodMenu from "../pages/mealSettings/foodMenu/index.js";
import Recipe from "../pages/mealSettings/recipe/recipe.js";
import Variant from "../pages/recipe/variant.js";
import RecipeTag from "../pages/mealSettings/recipeTag/recipeTag.js";
import AddRecipe from "../pages/mealSettings/addRecipe/index.js";
import DaySlot from "../pages/daySlot/index.js";
import PackageOrder from "../pages/order/packageOrder.js";
import AvailableCalories from "../pages/Calories/availableCalories.js";
import Country from "../pages/country/index.js";
import PlanCategory from "../pages/packageManagement/planCategory.js";
import FoodExchangeCalories from "../pages/Calories/foodExchangeCalori.js";
import AvailableSizes from "../pages/Calories/availableSizes.js";
import DietPrice from "../pages/Calories/dietPrice.js";
import Incredientmedicalcondition from "../pages/Calories/Incredientmedicalcondition.js";
import DeliveryManLocation from "../pages/dispatch/deliveryManLocation/index.js";

import AddMeal from "../pages/mealSettings/addMeal/index.js";
import Recipes from "../pages/mealSettings/recipes/index.js";
import RecipeReport from "../pages/report/recipeReport.js";

import BirthdayReport from "../pages/report/birthdayReport.js";
import WeddingdayReport from "../pages/report/weddingdayReport.js";
import NewPatientTodayReport from "../pages/report/newPatientTodayReport.js";

import DietCentreBranch from "../pages/registrationSettings/dietCentreBranch/index.js";
import ErrorLog from "../pages/errorLog/index.js";
import IngredientReport from "../pages/report/ingredientReport.js";

import RestoreDeliveryMan from "../pages/restoreUser/restoreDeliveryMan.js";
import RestorePatient from "../pages/restoreUser/restorePatient.js";
import RestoreDietitian from "../pages/restoreUser/restoreDietitian.js";
import RestoreFranchiseAdmin from "../pages/restoreUser/restoreFranchiseAdmin.js";
import Allergy from "../pages/allergy/index.js";
import Inventory from "../pages/inventory/index.js";
import UserLog from "../pages/report/userLog.js";
import Delivery from "../pages/order/delivery/index.js";
import Packaging from "../pages/order/packaging/index.js";
import Preparation from "../pages/order/preparation/index.js";
import Aibot from "../pages/order/aibot/index.js";
import LabelPrintSetting from "../pages/labelPrintSetting/index.js";
import FixedReplacableRecipe from "../pages/fixedReplacableRecipe/index.js";
import InvoiceSetting from "../pages/InvoiceSetting/index.js";


const RenderPage = (page, key, user, privileges) => {
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
    case "subscriptionPlans":
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
    case "foodexchange-calories":
      return <FoodExchangeCalories key={key} {...privileges} />;
    case "available-sizes":
      return <AvailableSizes key={key} {...privileges} />;
    case "diet-price":
      return <DietPrice key={key} {...privileges} />;
    case "incredient-medical-connection":
      return <Incredientmedicalcondition key={key} {...privileges} />;
    case "delivery-location":
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
    case "preparation":
      return <Preparation key={key} {...privileges} />;
    case "packaging":
      return <Packaging key={key} {...privileges} />;
    case "delivery":
      return <Delivery key={key} {...privileges} />;
    case "subscriber-log":
      return <UserLog key={key} {...privileges} />;
    case "food-exchange":
      return <Aibot key={key} {...privileges} />;
    case "label-print-setting":
      return <LabelPrintSetting key={key} {...privileges} />;
    case "fixed-replacable-recipe":
      return <FixedReplacableRecipe key={key} {...privileges} />;
    case "invoice-setting":
      return <InvoiceSetting key={key} {...privileges} />;
    case "country":
      return <Country key={key} {...privileges} />;
      case "planCategory":
      return <PlanCategory key={key} {...privileges} />;
    default:
      return <Page404 key={key}></Page404>;
  }
};

export default RenderPage;
