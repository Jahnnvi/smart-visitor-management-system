import React, { useState } from 'react';

export default function VerifyVisitor() {
	const PALETTE = {
		background: '#FAFCFC',
		cardDark: '#222121',
		textDark: '#2A2A2A',
		accent: '#4CD1D6',
		border: '#E5E4E3',
	};

	const [phone, setPhone] = useState('');
	const [requestId, setRequestId] = useState('');
	const [visitor, setVisitor] = useState(null);
	const [error, setError] = useState('');

	function determineStatus(source) {
		// Simple deterministic mock: last numeric char even => Approved, odd => Denied
		const digits = source.replace(/\D/g, '');
		if (!digits) return 'Denied';
		const last = parseInt(digits[digits.length - 1], 10);
		if (Number.isNaN(last)) return 'Denied';
		return last % 2 === 0 ? 'Approved' : 'Denied';
	}

	function handleVerify(e) {
		e.preventDefault();
		setError('');
		const key = phone.trim() || requestId.trim();
		if (!key) {
			setVisitor(null);
			setError('Enter a phone number or request ID to verify.');
			return;
		}

		const status = determineStatus(key);

		// Mock details
		const mock = {
			guestName: 'Alex Morgan',
			phoneNumber: phone || '+1 555 0123',
			visitorType: 'Pre-Registered',
			purpose: 'Campus Meeting - Orientation',
			assignedHost: 'Dr. Priya Sharma',
			visitDate: new Date().toLocaleString(),
			approvalStatus: status,
			checkedIn: false,
			requestId: requestId || 'REQ-' + Math.floor(Math.random() * 90000 + 10000),
		};

		setVisitor(mock);
	}

	function handleAllowEntry() {
		if (!visitor) return;
		setVisitor({ ...visitor, approvalStatus: 'Checked In', checkedIn: true });
	}

	const containerStyle = {
		minHeight: '100vh',
		background: PALETTE.background,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '40px 16px',
		color: PALETTE.textDark,
		fontFamily: 'Helvetica, Arial, sans-serif',
	};

	const cardStyle = {
		background: PALETTE.cardDark,
		color: '#fff',
		borderRadius: 10,
		width: 820,
		maxWidth: '100%',
		boxShadow: '0 6px 22px rgba(0,0,0,0.25)',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'row',
	};

	const leftStyle = {
		flex: 1,
		padding: 28,
		borderRight: `1px solid ${PALETTE.border}`,
		background: PALETTE.cardDark,
	};

	const rightStyle = {
		width: 360,
		padding: 24,
		background: PALETTE.cardDark,
	};

	const titleStyle = { margin: 0, fontSize: 28, color: PALETTE.accent };
	const subtitleStyle = { marginTop: 6, marginBottom: 18, color: '#ddd' };

	const labelStyle = { display: 'block', color: '#ddd', marginBottom: 6, fontSize: 13 };
	const inputStyle = {
		width: '100%',
		padding: '10px 12px',
		borderRadius: 6,
		border: `1px solid ${PALETTE.border}`,
		marginBottom: 14,
		outline: 'none',
		fontSize: 14,
		background: '#fff',
		color: PALETTE.textDark,
	};

	const buttonStyle = {
		background: PALETTE.accent,
		border: 'none',
		color: '#222',
		padding: '10px 14px',
		borderRadius: 8,
		cursor: 'pointer',
		fontWeight: 700,
		fontSize: 14,
	};

	const infoCardStyle = {
		marginTop: 18,
		background: '#fff',
		color: PALETTE.textDark,
		padding: 16,
		borderRadius: 8,
		border: `1px solid ${PALETTE.border}`,
	};

	const infoRow = (label, value) => (
		<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
			<div style={{ color: '#6b6b6b', fontSize: 13 }}>{label}</div>
			<div style={{ fontWeight: 600 }}>{value}</div>
		</div>
	);

	return (
		<div style={containerStyle}>
			<div style={cardStyle}>
				<div style={leftStyle}>
					<h1 style={titleStyle}>Verify Visitor</h1>
					<div style={subtitleStyle}>Verify pre-registered visitors before entry</div>

					<form onSubmit={handleVerify}>
						<label style={labelStyle}>Phone Number</label>
						<input
							style={inputStyle}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="Enter visitor phone number"
							aria-label="Phone Number"
						/>

						<label style={labelStyle}>Request ID (optional)</label>
						<input
							style={inputStyle}
							value={requestId}
							onChange={(e) => setRequestId(e.target.value)}
							placeholder="Optional request ID"
							aria-label="Request ID"
						/>

						<div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
							<button type="submit" style={buttonStyle}>Verify Visitor</button>
						</div>
					</form>

					{error && (
						<div style={{ marginTop: 12, color: '#ffdddd', background: '#3a1515', padding: 10, borderRadius: 6 }}>
							{error}
						</div>
					)}

					{visitor && (
						<div style={infoCardStyle}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div style={{ fontSize: 16, fontWeight: 700 }}>Visitor Details</div>
								<div style={{ fontSize: 12, color: '#666' }}>Request: {visitor.requestId}</div>
							</div>

							<div style={{ marginTop: 10 }}>
								{infoRow('Guest Name', visitor.guestName)}
								{infoRow('Phone Number', visitor.phoneNumber)}
								{infoRow('Visitor Type', visitor.visitorType)}
								{infoRow('Purpose', visitor.purpose)}
								{infoRow('Assigned Host', visitor.assignedHost)}
								{infoRow('Visit Date', visitor.visitDate)}
								<div style={{ paddingTop: 8 }}>
									<div style={{ fontSize: 13, color: '#6b6b6b' }}>Approval Status</div>
									<div style={{ marginTop: 6 }}>
										{visitor.approvalStatus === 'Approved' && (
											<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
												<div style={{ background: PALETTE.accent, color: '#072022', padding: '6px 10px', borderRadius: 6, fontWeight: 700 }}>
													Approved
												</div>
												{!visitor.checkedIn && (
													<button onClick={handleAllowEntry} style={{ ...buttonStyle, padding: '8px 10px' }}>
														Allow Entry
													</button>
												)}
												{visitor.checkedIn && (
													<div style={{ color: PALETTE.textDark, fontWeight: 700 }}>Checked In</div>
												)}
											</div>
										)}

										{visitor.approvalStatus === 'Denied' && (
											<div style={{ color: '#fff', marginTop: 6, padding: 10, borderRadius: 6, background: '#3b2b2b' }}>
												Entry Denied
											</div>
										)}

										{visitor.approvalStatus === 'Checked In' && (
											<div style={{ color: PALETTE.accent, fontWeight: 800, marginTop: 6 }}>Checked In</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div style={rightStyle}>
					<div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Gate Tools</div>
					<div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.5 }}>
						- Verify using visitor phone or optional Request ID.
						<br />- Approved visitors can be checked in from this panel.
						<br />- This is a simulation; no data is sent to a server.
					</div>

					<div style={{ marginTop: 18 }}>
						<div style={{ color: '#ddd', fontSize: 13, marginBottom: 8 }}>Quick sample</div>
						<div style={{ background: '#111', padding: 10, borderRadius: 8, color: '#eee', fontSize: 13 }}>
							Try phone ending with an even digit → Approved
							<br />ending with odd digit → Denied
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
