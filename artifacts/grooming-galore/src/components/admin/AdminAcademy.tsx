import { useState } from "react";
import { useGetAcademy, useUpdateAcademy, getGetAcademyQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

export function AdminAcademy() {
  const { data: academy } = useGetAcademy();
  const updateAcademy = useUpdateAcademy();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<any>(null);

  // Initialize form data when academy loads
  if (academy && !formData) {
    setFormData({
      name: academy.name,
      description: academy.description,
      courses: academy.courses || "",
      duration: academy.duration || "",
      fee: academy.fee || "",
      credentialInfo: academy.credentialInfo || "",
      internationalRecognition: academy.internationalRecognition || "",
      inquiryEmail: academy.inquiryEmail || "",
      inquiryPhone: academy.inquiryPhone || "",
      isActive: academy.isActive !== false,
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !academy) return;

    const payload = {
      ...formData,
      fee: formData.fee ? Number(formData.fee) : null,
    };

    updateAcademy.mutate({ data: payload }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAcademyQueryKey() });
        toast.success("Academy details updated");
      }
    });
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-foreground">Academy Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-md">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Academy Name</Label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea rows={4} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Courses Included</Label>
            <Input value={formData.courses} onChange={e => setFormData({...formData, courses: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Program Duration</Label>
            <Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Fee ($)</Label>
            <Input type="number" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Credential Info</Label>
            <Input value={formData.credentialInfo} onChange={e => setFormData({...formData, credentialInfo: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>International Recognition</Label>
            <Input value={formData.internationalRecognition} onChange={e => setFormData({...formData, internationalRecognition: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Inquiry Email</Label>
            <Input type="email" value={formData.inquiryEmail} onChange={e => setFormData({...formData, inquiryEmail: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="space-y-2">
            <Label>Inquiry Phone</Label>
            <Input value={formData.inquiryPhone} onChange={e => setFormData({...formData, inquiryPhone: e.target.value})} className="border-border bg-background" />
          </div>
          
          <div className="flex items-center space-x-2 md:col-span-2">
            <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({...formData, isActive: c})} />
            <Label>Academy Section Active</Label>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" /> Save Academy Details</Button>
      </form>
    </div>
  );
}
