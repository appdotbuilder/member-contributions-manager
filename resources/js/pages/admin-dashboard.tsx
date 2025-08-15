import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Head } from '@inertiajs/react';

interface Props {
    stats: {
        total_members: number;
        total_cash: number;
        monthly_income: number;
        monthly_expenses: number;
        net_cash_flow: number;
    };
    recent_contributions: Array<{
        id: number;
        amount: number;
        status: string;
        paid_date: string | null;
        user: {
            name: string;
        };
    }>;
    recent_expenditures: Array<{
        id: number;
        amount: number;
        category: string;
        description: string;
        expenditure_date: string;
        creator: {
            name: string;
        };
    }>;
    members_in_arrears: Array<{
        id: number;
        name: string;
        email: string;
        overdue_count: number;
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recent_contributions, recent_expenditures, members_in_arrears }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-50';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'overdue':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8">
                <Heading title="👑 Admin Dashboard" />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_members}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center dark:bg-blue-900">
                                <span className="text-xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Cash</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.total_cash)}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900">
                                <span className="text-xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.monthly_income)}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900">
                                <span className="text-xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p>
                                <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.monthly_expenses)}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center dark:bg-red-900">
                                <span className="text-xl">📉</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Net Cash Flow</p>
                                <p className={`text-2xl font-bold ${stats.net_cash_flow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(stats.net_cash_flow)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center dark:bg-purple-900">
                                <span className="text-xl">💱</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Contributions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                💳 Recent Contributions
                            </h3>
                        </div>
                        <div className="p-6">
                            {recent_contributions.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_contributions.map((contribution) => (
                                        <div key={contribution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{contribution.user.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatCurrency(contribution.amount)}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                                                {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 dark:text-gray-400">No recent contributions</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Expenditures */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📊 Recent Expenditures
                            </h3>
                        </div>
                        <div className="p-6">
                            {recent_expenditures.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_expenditures.map((expenditure) => (
                                        <div key={expenditure.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white truncate">{expenditure.description}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {expenditure.category} • {formatCurrency(expenditure.amount)}
                                                </p>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(expenditure.expenditure_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 dark:text-gray-400">No recent expenditures</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Members in Arrears */}
                {members_in_arrears.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ⚠️ Members with Overdue Payments
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {members_in_arrears.map((member) => (
                                    <div key={member.id} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400 dark:bg-red-900/20 dark:border-red-400">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full dark:bg-red-900 dark:text-red-300">
                                                    {member.overdue_count} overdue
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}