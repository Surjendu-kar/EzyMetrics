import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  lead: Partial<Lead> | null;
  onSave: (lead: Omit<Lead, "id">) => void;
  isNewLead: boolean;
}

const LeadModal: React.FC<LeadModalProps> = ({
  open,
  onClose,
  lead,
  onSave,
  isNewLead,
}) => {
  const [editedLead, setEditedLead] = React.useState<Omit<Lead, "id">>({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  React.useEffect(() => {
    if (lead) {
      setEditedLead({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "New",
      });
    }
  }, [lead]);

  const handleChange =
    (field: keyof Omit<Lead, "id">) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setEditedLead({ ...editedLead, [field]: e.target.value });
    };

  const handleSave = () => {
    onSave(editedLead);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isNewLead ? "Add New Lead" : "Lead Details"}
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={editedLead.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={editedLead.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          value={editedLead.phone}
          onChange={handleChange("phone")}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={editedLead.status}
            onChange={() => handleChange("status")}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </Select>
        </FormControl>
        {isNewLead && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Add Lead
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default LeadModal;
