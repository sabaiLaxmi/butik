import InfoPage from '../components/layout/InfoPage';

const ShippingPolicy = () => {
  return (
    <InfoPage title="Shipping Policy">
      <p style={{ marginBottom: 'var(--space-4)' }}>
        At A%LAN, we strive to deliver your pieces with the utmost care and precision. Our shipping policy is designed to ensure a seamless and elegant experience from the moment you place your order until it arrives at your door.
      </p>
      <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)', marginTop: 'var(--space-8)' }}>Our Commitment</h3>
      <p>
        Every piece is meticulously inspected before dispatch. Should you have any inquiries regarding our policies, our dedicated concierge team is always available to assist you. We believe in transparency and trust as the foundation of our relationship with you.
      </p>
    </InfoPage>
  );
};

export default ShippingPolicy;
