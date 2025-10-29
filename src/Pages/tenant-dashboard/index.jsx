import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PropertyContextBreadcrumbs from '../../components/ui/PropertyContextBreadcrumbs';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LeaseOverview from './components/LeaseOverview';
import PaymentSection from './components/PaymentSection';
import PaymentHistory from './components/PaymentHistory';
import MaintenanceRequests from './components/MaintenanceRequests';
import NotificationCenter from './components/NotificationCenter';
import ProfileManagement from './components/ProfileManagement';

const TenantDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [tenantData, setTenantData] = useState(null);
  const [leaseData, setLeaseData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Mock tenant and lease data
  useEffect(() => {
    const mockTenantData = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+264 81 123 4567",
      profileImage: "https://images.unsplash.com/photo-1498200705497-2c9e717e5ab8",
      profileImageAlt: "Professional headshot of Sarah Johnson in business attire",
      emergencyContact: {
        name: "Michael Johnson",
        relationship: "Spouse",
        phone: "+264 81 765 4321"
      },
      notifications: [
      {
        id: 1,
        title: "Rent Payment Due",
        message: "Your rent payment of NAD 1,200.00 is due in 3 days",
        type: "payment",
        date: "2024-10-20T09:00:00Z",
        read: false
      },
      {
        id: 2,
        title: "Maintenance Update",
        message: "Your air conditioning repair request has been scheduled for tomorrow",
        type: "maintenance",
        date: "2024-10-19T14:30:00Z",
        read: false
      },
      {
        id: 3,
        title: "Lease Renewal Notice",
        message: "Your lease expires in 4 months. Contact us to discuss renewal options",
        type: "lease",
        date: "2024-10-18T10:15:00Z",
        read: true
      }]

    };

    const mockLeaseData = {
      id: 1,
      propertyAddress: "123 Independence Avenue, Apt A101, Windhoek Central",
      buildingName: "Sunset Apartments",
      unitNumber: "A101",
      leaseStartDate: "2024-03-01",
      leaseEndDate: "2025-02-28",
      monthlyRent: 1200.00,
      securityDeposit: 2400.00,
      leaseDocument: "/documents/lease-agreement-sarah-johnson.pdf",
      landlordContact: {
        name: "Property Management Office",
        phone: "+264 61 234 567",
        email: "management@sunsetapartments.na"
      },
      currentBalance: 0.00,
      nextPaymentDue: "2024-11-01",
      paymentStatus: "current"
    };

    const mockPaymentData = {
      currentBalance: 0.00,
      nextPaymentAmount: 1200.00,
      nextPaymentDue: "2024-11-01",
      paymentMethod: "Bank Transfer",
      autopayEnabled: true,
      history: [
      {
        id: 1,
        date: "2024-10-01",
        amount: 1200.00,
        type: "rent",
        method: "Bank Transfer",
        status: "completed",
        reference: "TXN-2024-10-001",
        receipt: "/receipts/october-2024-rent.pdf"
      },
      {
        id: 2,
        date: "2024-09-01",
        amount: 1200.00,
        type: "rent",
        method: "Bank Transfer",
        status: "completed",
        reference: "TXN-2024-09-001",
        receipt: "/receipts/september-2024-rent.pdf"
      },
      {
        id: 3,
        date: "2024-08-01",
        amount: 1200.00,
        type: "rent",
        method: "Cash",
        status: "completed",
        reference: "TXN-2024-08-001",
        receipt: "/receipts/august-2024-rent.pdf"
      },
      {
        id: 4,
        date: "2024-07-15",
        amount: 150.00,
        type: "utility",
        method: "Bank Transfer",
        status: "completed",
        reference: "TXN-2024-07-002",
        receipt: "/receipts/july-2024-utilities.pdf"
      },
      {
        id: 5,
        date: "2024-07-01",
        amount: 1200.00,
        type: "rent",
        method: "Bank Transfer",
        status: "completed",
        reference: "TXN-2024-07-001",
        receipt: "/receipts/july-2024-rent.pdf"
      }]

    };

    setTenantData(mockTenantData);
    setLeaseData(mockLeaseData);
    setPaymentData(mockPaymentData);
  }, []);

  const handleMakePayment = () => {
    navigate('/payment-portal');
  };

  const handleViewReceipt = (receiptUrl) => {
    // In a real app, this would open the receipt PDF
    window.open(receiptUrl, '_blank');
  };

  const handleMaintenanceRequest = () => {
    navigate('/maintenance-request');
  };

  const handleContactLandlord = () => {
    window.location.href = `mailto:${leaseData?.landlordContact?.email}`;
  };

  const sections = [
  {
    id: 'overview',
    label: 'Lease Overview',
    icon: 'FileText'
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'CreditCard'
  },
  {
    id: 'history',
    label: 'Payment History',
    icon: 'History'
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: 'Wrench'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'Bell'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'User'
  }];


  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <LeaseOverview
            leaseData={leaseData}
            tenantData={tenantData}
            onContactLandlord={handleContactLandlord} />);


      case 'payments':
        return (
          <PaymentSection
            paymentData={paymentData}
            onMakePayment={handleMakePayment} />);


      case 'history':
        return (
          <PaymentHistory
            paymentHistory={paymentData?.history}
            onViewReceipt={handleViewReceipt} />);


      case 'maintenance':
        return (
          <MaintenanceRequests
            onNewRequest={handleMaintenanceRequest} />);


      case 'notifications':
        return (
          <NotificationCenter
            notifications={tenantData?.notifications} />);


      case 'profile':
        return (
          <ProfileManagement
            tenantData={tenantData} />);


      default:
        return null;
    }
  };

  const getUnreadNotificationCount = () => {
    return tenantData?.notifications?.filter((n) => !n?.read)?.length || 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="tenant"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="tenant" />

      <main className={`
        transition-all duration-300 ease-in-out pt-4 pb-8
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <PropertyContextBreadcrumbs />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {tenantData?.name?.split(' ')?.[0]}
              </h1>
              <p className="text-muted-foreground">
                Manage your lease information, payments, and communicate with your landlord
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationIndicator userRole="tenant" count={getUnreadNotificationCount()} />
              <Button
                variant="default"
                iconName="Phone"
                iconPosition="left"
                onClick={handleContactLandlord}>

                Contact Landlord
              </Button>
            </div>
          </div>

          {/* Quick Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p className="font-semibold text-success">Current</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="font-semibold text-foreground">Nov 1, 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Expires</p>
                  <p className="font-semibold text-foreground">Feb 28, 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Notifications</p>
                  <p className="font-semibold text-foreground">{getUnreadNotificationCount()} Unread</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Dashboard</h3>
                <nav className="space-y-2">
                  {sections?.map((section) =>
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === section?.id ?
                    'bg-primary text-primary-foreground' :
                    'text-foreground hover:bg-muted'}`
                    }>

                      <Icon name={section?.icon} size={16} />
                      <span className="text-sm font-medium">{section?.label}</span>
                      {section?.id === 'notifications' && getUnreadNotificationCount() > 0 &&
                    <span className="ml-auto bg-error text-error-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {getUnreadNotificationCount()}
                        </span>
                    }
                    </button>
                  )}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default TenantDashboard;