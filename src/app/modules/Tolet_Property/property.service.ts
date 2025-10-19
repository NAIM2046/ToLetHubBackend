import { Property ,  } from "./property.model";
import { TProperty ,PropertyDocument } from "./property.interface";

interface PropertyFilter {
  division?: string;
  district?: string;
  area?: string;
  propertyType?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  bathrooms?: number;
  available?: boolean;
  search?: string;
}
// ✅ Create Property
export const createPropertyService = async (data: TProperty) => {
  const newProperty = await Property.create(data);
  return newProperty;
};

// ✅ Get All Properties
export const getAllPropertiesService = async (
  filter: PropertyFilter = {},
  page: number = 1,
  limit: number = 10
): Promise<{ properties: PropertyDocument[]; total: number }> => {
  const mongoFilter: any = {};

  // ✅ Text Search
  if (filter.search) {
    mongoFilter.$text = { $search: filter.search };
  }

  // ✅ Field Filters
  if (filter.division) mongoFilter.division = filter.division;
  if (filter.district) mongoFilter.district = filter.district;
  if (filter.area) mongoFilter.area = filter.area;
  if (filter.propertyType) mongoFilter.propertyType = filter.propertyType;
  if (filter.bedrooms !== undefined) mongoFilter.bedrooms = filter.bedrooms;
  if (filter.bathrooms !== undefined) mongoFilter.bathrooms = filter.bathrooms;
  if (filter.available !== undefined) mongoFilter.available = filter.available;

  if (filter.minRent || filter.maxRent) {
    mongoFilter.rentAmount = {};
    if (filter.minRent) mongoFilter.rentAmount.$gte = filter.minRent;
    if (filter.maxRent) mongoFilter.rentAmount.$lte = filter.maxRent;
  }

  // ✅ Pagination
  const skip = (page - 1) * limit;

  // ✅ Total count (for frontend pagination)
  const total = await Property.countDocuments(mongoFilter);

  // ✅ Query
  const properties = await Property.find(mongoFilter)
    .sort(filter.search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  return { properties, total };
};

// ✅ Get Single Property by ID
export const getPropertyByIdService = async (id: string) => {
  const property = await Property.findById(id);
  return property;
};

// ✅ Update Property
export const updatePropertyService = async (id: string, data: Partial<TProperty>) => {
  const updatedProperty = await Property.findByIdAndUpdate(id, data, { new: true });
  return updatedProperty;
};

// ✅ Delete Property
export const deletePropertyService = async (id: string) => {
  const deletedProperty = await Property.findByIdAndDelete(id);
  return deletedProperty;
};

// ✅ Get Properties by User
export const getPropertiesByUserService = async (userId: string) => {
  const userProperties = await Property.find({ userId });
  return userProperties;
};
