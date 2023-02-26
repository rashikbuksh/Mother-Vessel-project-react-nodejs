import React from "react";
import DashboardStatsGrid from "../../components/DashboardStatsGrid";
import TransactionChart from "../../components/TransactionChart";
import RecentOrders from "../../components/RecentOrders";
import BuyerProfilePieChart from "../../components/BuyerProfilePieChart";
import PopularProducts from "../../components/PopularProducts";

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
