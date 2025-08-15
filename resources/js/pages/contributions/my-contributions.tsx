import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Head, Link } from '@inertiajs/react';

interface Props {
    contributions: {
        data: Array<{
            id: number;
            amount: number;
            due_date: string;
            paid_date: string | null;
            status: string;
            notes: string | null;
            payment_proof: string | null;
        }>;
        links: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function MyContributions({ contributions }: Props) {
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
            <Head title="My Contributions" />
            
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Heading title="💳 My Contributions" />
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contributions.meta.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center dark:bg-blue-900">
                                <span className="text-xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {contributions.data.filter(c => c.status === 'paid').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900">
                                <span className="text-xl">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {contributions.data.filter(c => c.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center dark:bg-yellow-900">
                                <span className="text-xl">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {contributions.data.filter(c => c.status === 'overdue').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center dark:bg-red-900">
                                <span className="text-xl">⚠️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contributions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Payment History
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Complete list of your contribution payments
                        </p>
                    </div>

                    <div className="p-6">
                        {contributions.data.length > 0 ? (
                            <div className="space-y-4">
                                {contributions.data.map((contribution) => (
                                    <div key={contribution.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                                                    <span className="text-xl">{getStatusIcon(contribution.status)}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-3">
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(contribution.amount)}
                                                        </p>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contribution.status)}`}>
                                                            {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>Due: {new Date(contribution.due_date).toLocaleDateString()}</span>
                                                        {contribution.paid_date && (
                                                            <span>• Paid: {new Date(contribution.paid_date).toLocaleDateString()}</span>
                                                        )}
                                                    </div>
                                                    {contribution.notes && (
                                                        <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                                                            {contribution.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                {contribution.payment_proof && (
                                                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 dark:text-blue-400">
                                                        📎 View Proof
                                                    </button>
                                                )}
                                                <span className="text-xs text-gray-400">
                                                    #{contribution.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
                                    <span className="text-3xl">💳</span>
                                </div>
                                <p className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No contributions yet</p>
                                <p className="text-gray-600 dark:text-gray-400">Your contribution history will appear here</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {contributions.meta.last_page > 1 && (
                        <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Showing {((contributions.meta.current_page - 1) * contributions.meta.per_page) + 1} to{' '}
                                    {Math.min(contributions.meta.current_page * contributions.meta.per_page, contributions.meta.total)} of{' '}
                                    {contributions.meta.total} results
                                </div>
                                <div className="flex space-x-2">
                                    {contributions.links.prev && (
                                        <Link
                                            href={contributions.links.prev}
                                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {contributions.links.next && (
                                        <Link
                                            href={contributions.links.next}
                                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}