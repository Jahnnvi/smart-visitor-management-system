import React, { useState } from 'react';

export default function OnSpotEntry() {
	const PALETTE = {
		background: '#FAFCFC',
		cardDark: '#222121',
		textDark: '#2A2A2A',
		accent: '#4CD1D6',
		border: '#E5E4E3',
	};

	const [visitorName, setVisitorName] = useState('');
	const [phone, setPhone] = useState('');
	const [type, setType] = useState('Campus Visitor');
	const [studentName, setStudentName] = useState('');
	const [studentId, setStudentId] = useState('');
	const [reason, setReason] = useState('');
	const [errors, setErrors] = useState({});
	const [confirmation, setConfirmation] = useState(null);

	function validate() {
		const e = {};
		if (!visitorName.trim()) e.visitorName = 'Visitor name is required';
		if (!phone.trim()) e.phone = 'Phone number is required';
		if (!reason.trim()) e.reason = 'Reason for visit is required';
		if (type === 'Parent') {
			if (!studentName.trim()) e.studentName = 'Student name required for parents';
			if (!studentId.trim()) e.studentId = 'Student ID required for parents';
		}
		return e;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const eObj = validate();
		setErrors(eObj);
		if (Object.keys(eObj).length > 0) {
			setConfirmation(null);
			return;
		}

		const conf = {
			visitorName: visitorName.trim(),
			phone: phone.trim(),
			visitorType: 'On-the-Spot',
			subtype: type,
			reason: reason.trim(),
			entryStatus: 'Checked In',
			entryTime: new Date().toLocaleString(),
		};

		setConfirmation(conf);
	}

	const container = {
		minHeight: '100vh',
		background: PALETTE.background,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 28,
		fontFamily: 'Helvetica, Arial, sans-serif',
		color: PALETTE.textDark,
	};

	const card = {
		width: 840,
		maxWidth: '100%',
		display: 'flex',
		borderRadius: 10,
		overflow: 'hidden',
		boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
		background: PALETTE.cardDark,
		color: '#fff',
	};

	const left = { flex: 1, padding: 28, borderRight: `1px solid ${PALETTE.border}` };
	const right = { width: 340, padding: 24 };

	const title = { margin: 0, fontSize: 26, color: PALETTE.accent };
	const subtitle = { marginTop: 6, color: '#ddd', marginBottom: 18 };

	const label = { display: 'block', color: '#ddd', fontSize: 13, marginBottom: 6 };
	const input = {
		width: '100%',
		padding: '10px 12px',
		borderRadius: 6,
		border: `1px solid ${PALETTE.border}`,
		marginBottom: 12,
		background: '#fff',
		color: PALETTE.textDark,
		fontSize: 14,
	};

	const select = { ...input, appearance: 'none' };
	const textarea = { ...input, minHeight: 90, resize: 'vertical' };

	const btn = {
		background: PALETTE.accent,
		color: '#222',
		border: 'none',
		padding: '10px 14px',
		borderRadius: 8,
		fontWeight: 700,
		cursor: 'pointer',
	};

	const errorStyle = { color: '#ffdddd', background: '#3a1515', padding: 8, borderRadius: 6, marginBottom: 8 };

	return (
		<div style={container}>
			<div style={card}>
				<div style={left}>
					<h1 style={title}>On-the-Spot Entry</h1>
					<div style={subtitle}>Register visitors arriving without pre-registration</div>

					<form onSubmit={handleSubmit}>
						<label style={label}>Visitor Name</label>
						<input style={input} value={visitorName} onChange={(e) => setVisitorName(e.target.value)} placeholder="Full name" />
						{errors.visitorName && <div style={errorStyle}>{errors.visitorName}</div>}

						<label style={label}>Phone Number</label>
						<input style={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
						{errors.phone && <div style={errorStyle}>{errors.phone}</div>}

						<label style={label}>Visitor Type</label>
						<select style={select} value={type} onChange={(e) => setType(e.target.value)}>
							<option>Parent</option>
							<option>Campus Visitor</option>
						</select>

						{type === 'Parent' && (
							<>
								<label style={label}>Student Name</label>
								<input style={input} value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student full name" />
								{errors.studentName && <div style={errorStyle}>{errors.studentName}</div>}

								<label style={label}>Student ID</label>
								<input style={input} value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
								{errors.studentId && <div style={errorStyle}>{errors.studentId}</div>}
							</>
						)}

						<label style={label}>Reason for Visit</label>
						<textarea style={textarea} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter purpose of visit" />
						{errors.reason && <div style={errorStyle}>{errors.reason}</div>}

						<div style={{ marginTop: 8 }}>
							<button type="submit" style={btn}>Allow Entry</button>
						</div>
					</form>

					{confirmation && (
						<div style={{ marginTop: 18, background: '#fff', color: PALETTE.textDark, padding: 16, borderRadius: 8, border: `1px solid ${PALETTE.border}` }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div style={{ fontWeight: 800 }}>Entry Confirmed</div>
								<div style={{ color: '#666', fontSize: 12 }}>{confirmation.entryTime}</div>
							</div>

							<div style={{ marginTop: 10 }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Visitor Name</div>
									<div style={{ fontWeight: 700 }}>{confirmation.visitorName}</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Phone Number</div>
									<div style={{ fontWeight: 700 }}>{confirmation.phone}</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Visitor Type</div>
									<div style={{ fontWeight: 700 }}>{confirmation.visitorType}</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Subtype</div>
									<div style={{ fontWeight: 700 }}>{confirmation.subtype}</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Reason</div>
									<div style={{ fontWeight: 700 }}>{confirmation.reason}</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', marginTop: 8 }}>
									<div style={{ color: '#6b6b6b', fontSize: 13 }}>Entry Status</div>
									<div style={{ fontWeight: 800, color: PALETTE.accent }}>{confirmation.entryStatus}</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div style={right}>
					<div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Gate Helper</div>
					<div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.5 }}>
						- Use this form to register visitors who arrive without pre-registration.
						<br />- Parents must provide student details to validate entry.
						<br />- This simulates a gate-level check-in only.
					</div>

					<div style={{ marginTop: 18 }}>
						<div style={{ color: '#ddd', fontSize: 13, marginBottom: 8 }}>Sample</div>
						<div style={{ background: '#111', padding: 10, borderRadius: 8, color: '#eee', fontSize: 13 }}>
							Fill the form and press "Allow Entry" to confirm.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

