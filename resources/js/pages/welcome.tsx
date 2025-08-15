import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Member Contribution Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Navigation Header */}
                <header className="w-full px-6 py-4 lg:px-8">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-5 py-2 text-gray-700 font-medium text-sm hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="px-6 py-12 lg:px-8 lg:py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 font-medium text-sm rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    💳 Mobile Banking Experience
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 dark:text-white">
                                💰 Member Contribution
                                <br />
                                <span className="text-blue-600">Management System</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed dark:text-gray-300">
                                Streamline monthly member dues with an elegant, mobile-first platform. 
                                Track payments, manage expenditures, and keep members informed with automated notifications.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        🚀 Start Managing Now
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors shadow-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    >
                                        📱 Login to Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {/* Admin Features */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div className="mb-6">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 dark:bg-blue-900">
                                        <span className="text-2xl">👑</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Admin Dashboard</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Complete control panel for managing members and finances</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Track total cash & member status
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Manage member data & payments
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Record expenditures with proof
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Generate reports & analytics
                                    </li>
                                </ul>
                            </div>

                            {/* Member Features */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div className="mb-6">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 dark:bg-green-900">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Member Portal</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Easy access to payment status and history</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        View current payment status
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Access complete payment history
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Download payment proofs
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Receive important notifications
                                    </li>
                                </ul>
                            </div>

                            {/* Automation Features */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 md:col-span-2 lg:col-span-1">
                                <div className="mb-6">
                                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 dark:bg-purple-900">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Smart Automation</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Automated notifications and WhatsApp integration</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Automated dues reminders
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        WhatsApp API integration
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Payment confirmations
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        Balance update notifications
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Screenshots/Mockups Section */}
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-16 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                                    📱 Mobile-First Design
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    Experience the elegance of modern mobile banking in contribution management
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Dashboard Mockup */}
                                <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                                    <div className="mb-4">
                                        <div className="w-full h-2 bg-blue-400 rounded mb-2"></div>
                                        <div className="w-3/4 h-2 bg-blue-400 rounded"></div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold mb-2">📊 Dashboard</h3>
                                        <p className="text-sm opacity-90">Real-time financial overview</p>
                                    </div>
                                </div>

                                {/* Contributions Mockup */}
                                <div className="bg-gradient-to-b from-green-500 to-green-600 rounded-2xl p-6 text-white">
                                    <div className="mb-4">
                                        <div className="space-y-2">
                                            <div className="w-full h-3 bg-green-400 rounded"></div>
                                            <div className="w-5/6 h-3 bg-green-400 rounded"></div>
                                            <div className="w-4/5 h-3 bg-green-400 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold mb-2">💳 Payments</h3>
                                        <p className="text-sm opacity-90">Track all contributions</p>
                                    </div>
                                </div>

                                {/* Reports Mockup */}
                                <div className="bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                                    <div className="mb-4">
                                        <div className="flex items-end space-x-1">
                                            <div className="w-4 h-6 bg-purple-400 rounded"></div>
                                            <div className="w-4 h-8 bg-purple-400 rounded"></div>
                                            <div className="w-4 h-4 bg-purple-400 rounded"></div>
                                            <div className="w-4 h-7 bg-purple-400 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold mb-2">📈 Reports</h3>
                                        <p className="text-sm opacity-90">Detailed analytics</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        {!auth.user && (
                            <div className="text-center bg-blue-600 rounded-3xl p-12 text-white">
                                <h2 className="text-3xl font-bold mb-6">
                                    🎯 Ready to Transform Your Member Management?
                                </h2>
                                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                                    Join thousands of organizations already using our platform to streamline their contribution management
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                                    >
                                        🚀 Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold text-lg rounded-xl border-2 border-blue-500 hover:bg-blue-800 transition-colors"
                                    >
                                        📱 Login Now
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                        Built with ❤️ for modern member organizations
                    </p>
                    <p className="text-sm">
                        Powered by{" "}
                        <a 
                            href="https://app.build" 
                            target="_blank" 
                            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            app.build
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}