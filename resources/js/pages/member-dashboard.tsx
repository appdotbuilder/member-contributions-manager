import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Head, Link } from '@inertiajs/react';

interface Props {
    current_contribution: {
        id: number;
        amount: number;
        due_date: string;
        status: string;
        paid_date: string | null;
    } | null;
    contribution_history: Array<{
        id: number;
        amount: number;
        due_date: string;
        paid_date: string | null;
        status: string;
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
    notifications: Array<{
        id: number;
        title: string;
        message: string;
        type: string;
        created_at: string;
    }>;
    user_balance: number;
    [key: string]: unknown;
}

export default function MemberDashboard({ 
    current_contribution, 
    contribution_history, 
    recent_expenditures, 
    notifications, 
    user_balance 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'overdue':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return '✅';
            case 'pending':
                return '⏳';
            case 'overdue':
                return '⚠️';
            default:
                return '❓';
        }
    };

    return (
        <AppShell>
            <Head title="My Dashboard" />
            
            <div className="space-y-8">
                <Heading title="👤 My Dashboard" />

                {/* Current Month Status */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
                            📅 This Month's Contribution
                        </h2>
                        {current_contribution ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center space-x-4">
                                    <span className="text-4xl">{getStatusIcon(current_contribution.status)}</span>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(current_contribution.amount)}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Due: {new Date(current_contribution.due_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(current_contribution.status)}`}>
                                        {current_contribution.status.charAt(0).toUpperCase() + current_contribution.status.slice(1)}
                                        {current_contribution.paid_date && (
                                            <span className="ml-2">• Paid on {new Date(current_contribution.paid_date).toLocaleDateString()}</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-4 block">📝</span>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    No contribution scheduled for this month
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">My Balance</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(user_balance)}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900">
                                <span className="text-xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contribution_history.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center dark:bg-blue-900">
                                <span className="text-xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Contribution History */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📈 Payment History
                            </h3>
                            <Link 
                                href={route('my-contributions')}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            {contribution_history.length > 0 ? (
                                <div className="space-y-4">
                                    {contribution_history.slice(0, 5).map((contribution) => (
                                        <div key={contribution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{getStatusIcon(contribution.status)}</span>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {formatCurrency(contribution.amount)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Due: {new Date(contribution.due_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                                                {contribution.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 dark:text-gray-400">No payment history yet</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Expenditures */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                🏛️ Recent Expenditures
                            </h3>
                        </div>
                        <div className="p-6">
                            {recent_expenditures.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_expenditures.map((expenditure) => (
                                        <div key={expenditure.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                                    {expenditure.description}
                                                </p>
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

                {/* Notifications */}
                {notifications.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                🔔 Recent Notifications
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 dark:bg-blue-900/20 dark:border-blue-400">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                                                {new Date(notification.created_at).toLocaleDateString()}
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