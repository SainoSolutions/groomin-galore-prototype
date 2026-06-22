import { useState } from "react";
import { useListLocations, useCreateLocation, useUpdateLocation, useDeleteLocation, getListLocationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Edit, Trash, Plus } from "lucide-react";

export function AdminLocations() {
  const { data: locations = [] } = useListLocations();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    openingHours: "",
    mapUrl: "",
    isMain: false,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      openingHours: "",
      mapUrl: "",
      isMain: false,
    });
    setEditingId(null);
  };

  const handleEdit = (location: any) => {
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city || "",
      phone: location.phone,
      email: location.email || "",
      openingHours: location.openingHours || "",
      mapUrl: location.mapUrl || "",
      isMain: location.isMain || false,
    });
    setEditingId(location.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this location?")) {
      deleteLocation.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListLocationsQueryKey() });
          toast.success("Location deleted");
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateLocation.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListLocationsQueryKey() });
          toast.success("Location updated");
          setIsDialogOpen(false);
        }
      });
    } else {
      createLocation.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListLocationsQueryKey() });
          toast.success("Location created");
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-foreground">Locations</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Location</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingId ? 'Edit Location' : 'Add Location'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Address</Label>
                  <Input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Opening Hours</Label>
                  <Input required value={formData.openingHours} onChange={e => setFormData({...formData, openingHours: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Map URL</Label>
                  <Input value={formData.mapUrl} onChange={e => setFormData({...formData, mapUrl: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <Switch checked={formData.isMain} onCheckedChange={(c) => setFormData({...formData, isMain: c})} />
                  <Label>Is Main Flagship Location</Label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">Save Location</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Flagship</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id} className="border-border">
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.phone}</TableCell>
                <TableCell>{location.isMain ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(location)}><Edit className="w-4 h-4 text-primary" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(location.id)}><Trash className="w-4 h-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {locations.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No locations found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
