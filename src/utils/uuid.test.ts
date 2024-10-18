import { describe, it, expect, vi } from 'vitest';

import { generateUUID, generateCryptoRandomUUID } from './uuid';

describe('UUID Utility Functions', () => {
	it('should generate a valid UUID', () => {
		const UUID = generateUUID();

		expect(UUID).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
	});

	it('should generate a valid UUID using crypto.randomUUID if available', () => {
		const MOCK_CRYPTO_UUID = {
			randomUUID: vi.fn().mockReturnValue('mocked-uuid'),
		};

		vi.stubGlobal('crypto', MOCK_CRYPTO_UUID);

		const UUID = generateCryptoRandomUUID();

		expect(UUID).toBe('mocked-uuid');
		expect(MOCK_CRYPTO_UUID.randomUUID).toHaveBeenCalled();
	});
});
