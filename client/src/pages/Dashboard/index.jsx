import React from "react";
import DashboardStatsGrid from "../../components/AdminDashboard/DashboardStatsGrid";
import TransactionChart from "../../components/AdminDashboard/TransactionChart";
import RecentOrders from "../../components/AdminDashboard/RecentOrders";
import BuyerProfilePieChart from "../../components/AdminDashboard/BuyerProfilePieChart";
import PopularProducts from "../../components/AdminDashboard/PopularProducts";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid />
            <div className="flex w-full flex-row gap-4">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex w-full flex-row gap-4">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    );
}
