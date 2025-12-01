import { Request, Response } from "express";
import {
  createPropertyService,
  getAllPropertiesService,
  getPropertyByIdService,
  updatePropertyService,
  deletePropertyService,
  getPropertiesByUserService,
} from "./property.service";
import { TProperty } from "./property.interface";

// 🏠 Create new property
export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    req.body.userId = userId;
    const newProperty: TProperty = await createPropertyService(req.body);
    
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 📋 Get all properties
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
    
  try {
     const {
      division,
      district,
      area,
      propertyType,
      minRent,
      maxRent,
      bedrooms,
      bathrooms,
      available,
      search,
      page,
      limit
    } = req.query;
    const filter = {
      division: division as string,
      district: district as string,
      area: area as string,
      propertyType: propertyType as string,
      minRent: minRent ? Number(minRent) : undefined,
      maxRent: maxRent ? Number(maxRent) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      available: available ? available === "true" : undefined,
      search: search as string | undefined
    };
     const currentPage = page ? Number(page) : 1;
    const perPage = limit ? Number(limit) : 10;
   const { properties, total } = await getAllPropertiesService(filter, currentPage, perPage);

    res.status(200).json({
      properties,
      total,
      page: currentPage,
      limit: perPage
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get single property
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await getPropertyByIdService(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    res.status(200).json(property);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update property
export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await updatePropertyService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Delete property
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await deletePropertyService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 👤 Get properties posted by a specific user
export const getPropertiesByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await getPropertiesByUserService(req.params.userId);
    res.status(200).json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
