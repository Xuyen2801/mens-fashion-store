export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const USERS_API_URL = `${API_BASE_URL}/users`;

type AnyRecord = Record<string, any>;

const DEFAULT_COLOR_HEX = "#9CA3AF";

function normalizeColorText(value: unknown): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferHexFromColorName(name: unknown): string {
  const text = normalizeColorText(name);
  if (!text) return DEFAULT_COLOR_HEX;

  if (text.includes("xanh navy") || text.includes("navy")) return "#1F3A7A";
  if (text.includes("xanh reu") || text.includes("reu")) return "#4A5D23";
  if (text.includes("xanh den")) return "#1E2A44";
  if (text.includes("xanh la") || text.includes("green")) return "#2E7D32";
  if (text.includes("xanh") || text.includes("blue")) return "#2B6CB0";
  if (text.includes("trang kem") || text.includes("off white") || text.includes("offwhite")) return "#F5F1E6";
  if (text.includes("kem") || text.includes("be") || text.includes("beige")) return "#D2B48C";
  if (text.includes("xam") || text.includes("ghi") || text.includes("gray") || text.includes("grey")) return "#9CA3AF";
  if (text.includes("nau") || text.includes("brown")) return "#8B5E3C";
  if (text.includes("do") || text.includes("red")) return "#C62828";
  if (text.includes("vang") || text.includes("yellow")) return "#D4A017";
  if (text.includes("hong") || text.includes("pink")) return "#D87093";
  if (text.includes("tim") || text.includes("purple")) return "#6B46C1";
  if (text.includes("den") || text.includes("black")) return "#1A1A1A";
  if (text.includes("trang") || text.includes("white")) return "#F5F5F5";

  return DEFAULT_COLOR_HEX;
}

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toUniqueStrings(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return Array.from(
    new Set(
      input
        .map((item) => String(item || "").trim())
        .filter((item) => item.length > 0)
    )
  );
}

function normalizeColorItem(color: unknown): AnyRecord | null {
  if (typeof color === "string") {
    const name = color.trim();
    if (!name) return null;
    return { name, hex: DEFAULT_COLOR_HEX };
  }

  if (!isRecord(color)) return null;

  const name = String(color.name || color.color || "").trim();
  if (!name) return null;

  return {
    ...color,
    name,
    hex: color.hex || inferHexFromColorName(name),
  };
}

function dedupeColors(colors: AnyRecord[]): AnyRecord[] {
  const seen = new Set<string>();
  const result: AnyRecord[] = [];

  for (const color of colors) {
    const key = String(color.name || "").toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(color);
  }

  return result;
}

function isProductLike(item: AnyRecord): boolean {
  if (!item || typeof item !== "object") return false;

  const hasIdentity = "name" in item || "sku" in item || "slug" in item;
  const hasProductSignals = [
    "salePrice",
    "variants",
    "colors",
    "sizes",
    "outOfStockSizes",
    "material",
    "fit",
    "stock",
    "reviewCount",
  ].some((key) => key in item);

  return hasIdentity && hasProductSignals;
}

function normalizeProduct(product: AnyRecord): AnyRecord {
  const variants = Array.isArray(product.variants)
    ? product.variants.filter((variant) => isRecord(variant))
    : [];

  const variantSizes = toUniqueStrings(variants.flatMap((variant) => variant.sizes || []));
  const baseSizes = toUniqueStrings(product.sizes);
  const stockSizes = isRecord(product.stock)
    ? toUniqueStrings(Object.keys(product.stock))
    : [];
  const sizes =
    baseSizes.length > 0
      ? baseSizes
      : variantSizes.length > 0
        ? variantSizes
        : stockSizes;

  const colorFromProduct = Array.isArray(product.colors)
    ? product.colors
        .map((color) => {
          const normalized = normalizeColorItem(color);
          if (!normalized) return null;

          return {
            ...normalized,
            thumbnail:
              normalized.thumbnail ||
              normalized.image ||
              product.image ||
              product.images?.[0],
          };
        })
        .filter(Boolean) as AnyRecord[]
    : [];

  const colorFromVariants = variants
    .map((variant) => {
      const name = String(variant.color || variant.name || "").trim();
      if (!name) return null;

      return {
        name,
        hex: variant.hex || inferHexFromColorName(name),
        thumbnail: variant.image || product.image || product.images?.[0],
      };
    })
    .filter(Boolean) as AnyRecord[];

  const colors = dedupeColors(
    colorFromProduct.length > 0 ? colorFromProduct : colorFromVariants
  );

  const normalizedColors =
    colors.length > 0
      ? colors
      : [
          {
            name: String(product.color || "Tieu chuan").trim() || "Tieu chuan",
            hex: DEFAULT_COLOR_HEX,
            thumbnail: product.image || product.images?.[0],
          },
        ];

  const normalizedVariants =
    variants.length > 0
      ? variants.map((variant, index) => ({
          ...variant,
          color: String(variant.color || variant.name || `Mau-${index + 1}`),
          sizes: toUniqueStrings(variant.sizes).length > 0 ? toUniqueStrings(variant.sizes) : sizes,
          image: variant.image || product.image || product.images?.[0],
          hex: variant.hex || inferHexFromColorName(variant.color || variant.name),
        }))
        : normalizedColors.map((color, index) => ({
          color: color.name,
          hex: color.hex || inferHexFromColorName(color.name),
          sizes,
          image: color.thumbnail || color.image || product.image || product.images?.[0],
          id: `${product.id || product.sku || "variant"}-${index}`,
        }));

  return {
    ...product,
    sizes,
    colors: normalizedColors,
    variants: normalizedVariants,
  };
}

function normalizeCollectionData<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => normalizeCollectionData(item)) as T;
  }

  if (!isRecord(input)) {
    return input;
  }

  if (Array.isArray(input.products)) {
    return {
      ...input,
      products: input.products.map((product: unknown) =>
        isRecord(product) ? normalizeProduct(product) : product
      ),
    } as T;
  }

  if (isProductLike(input)) {
    return normalizeProduct(input) as T;
  }

  const normalized: AnyRecord = {};
  for (const [key, value] of Object.entries(input)) {
    normalized[key] = normalizeCollectionData(value);
  }

  return normalized as T;
}

export async function fetchCollection<T>(collectionName: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api/${collectionName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collectionName}: ${response.status}`);
  }

  const data = await response.json();
  return normalizeCollectionData<T>(data);
}