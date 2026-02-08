import { useNavigate } from 'react-router-dom';

export default function GateDashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      icon: '✓',
      title: 'Verify Pre-Registered Visitor',
      description: 'Check and verify pre-registered visitors entering the campus',
      path: '/security/verify'
    },
    {
      id: 2,
      icon: '👤',
      title: 'On-the-Spot Entry',
      description: 'Register and process parents and campus visitors on arrival',
      path: '/security/on-spot-entry'
    },
    {
      id: 3,
      icon: '📋',
      title: 'Today\'s Gate Log',
      description: 'View and review all visitor entries for today',
      path: '/security/logs'
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#FAFCFC',
    padding: '50px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const centeredContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '50px'
  };

  const titleStyle = {
    fontSize: '42px',
    fontWeight: '700',
    color: '#2A2A2A',
    margin: '0 0 12px 0',
    letterSpacing: '-0.5px'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#666666',
    margin: '0',
    fontWeight: '400'
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    margin: '0'
  };

  const cardStyle = {
    backgroundColor: '#222121',
    borderRadius: '12px',
    padding: '32px 24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `1px solid #333333`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const iconStyle = {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block'
  };

  const cardTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#FFFFFF',
    margin: '0 0 12px 0',
    letterSpacing: '-0.3px'
  };

  const cardDescriptionStyle = {
    fontSize: '14px',
    color: '#CCCCCC',
    margin: '0 0 24px 0',
    flex: 1,
    lineHeight: '1.6'
  };

  const buttonStyle = {
    backgroundColor: '#4CD1D6',
    color: '#222121',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    alignSelf: 'flex-start'
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div style={containerStyle}>
      <div style={centeredContentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Security Gate Dashboard</h1>
          <p style={subtitleStyle}>Manage visitor entry at the campus gate</p>
        </div>

        <div style={cardsContainerStyle}>
          {actions.map((action) => (
            <div
              key={action.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={iconStyle}>{action.icon}</span>
              <h2 style={cardTitleStyle}>{action.title}</h2>
              <p style={cardDescriptionStyle}>{action.description}</p>
              <button
                style={buttonStyle}
                onClick={() => handleCardClick(action.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
