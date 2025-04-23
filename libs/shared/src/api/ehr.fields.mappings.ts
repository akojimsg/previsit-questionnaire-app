import { fetchWithTenant } from "src/api/fetcher";
import { EhrFieldMapping } from "src/types";

export async function fetchEhrFieldMappings(
  baseUrl: string,
  tenantId: string,
  ehrProvider?: string
) {
  const url = ehrProvider
    ? `${baseUrl}/v1/ehr-mappings?ehrProvider=${encodeURIComponent(ehrProvider)}`
    : `${baseUrl}/v1/ehr-mappings`;

  return fetchWithTenant(url, {}, tenantId);
}

export async function createMapping(
  baseUrl: string,
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >,
  tenantId: string
) {
  return fetchWithTenant(
    `${baseUrl}/v1/ehr-mappings`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    tenantId
  );
}

export async function updateMapping(
  baseUrl: string,
  tenantId: string,
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >
) {
  const url = `${baseUrl}/v1/ehr-mappings?ehrProvider=${data.ehrProvider}&questionKey=${data.questionKey}`;
  return fetchWithTenant(
    url,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    tenantId
  );
}

export async function deleteMapping(
  baseUrl: string,
  tenantId: string,
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >
) {
  const url = `${baseUrl}/v1/ehr-mappings?ehrProvider=${data.ehrProvider}&questionKey=${data.questionKey}`;
  return fetchWithTenant(
    url,
    {
      method: "DELETE",
    },
    tenantId
  );
}