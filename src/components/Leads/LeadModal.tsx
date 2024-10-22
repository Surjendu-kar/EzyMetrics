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
  Stack,
  SelectChangeEvent,
  Alert,
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

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const initialLeadState: Omit<Lead, "id"> = {
  name: "",
  email: "",
  phone: "",
  status: "New",
};

const LeadModal: React.FC<LeadModalProps> = ({
  open,
  onClose,
  lead,
  onSave,
  isNewLead,
}) => {
  const [isEditing, setIsEditing] = React.useState(isNewLead);
  const [editedLead, setEditedLead] =
    React.useState<Omit<Lead, "id">>(initialLeadState);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [showValidationError, setShowValidationError] = React.useState(false);

  React.useEffect(() => {
    if (lead) {
      setEditedLead({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "New",
      });
    } else {
      setEditedLead(initialLeadState);
    }
    setIsEditing(isNewLead);
    setErrors({});
    setShowValidationError(false);
  }, [lead, isNewLead]);

  const resetAllStates = () => {
    setEditedLead(initialLeadState);
    setErrors({});
    setShowValidationError(false);
    setIsEditing(false);
  };

  const handleClose = () => {
    resetAllStates();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!editedLead.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!editedLead.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedLead.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!editedLead.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(editedLead.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Phone must contain only numbers";
    } else if (editedLead.phone.replace(/[-\s]/g, "").length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[\d\s-]*$/.test(value)) {
      setEditedLead({ ...editedLead, phone: value });
      setErrors({ ...errors, phone: undefined });
      setShowValidationError(false);
    }
  };

  const handleTextChange =
    (field: keyof Omit<Lead, "id" | "status">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "phone") {
        handlePhoneChange(e);
      } else {
        setEditedLead({ ...editedLead, [field]: e.target.value });
        setErrors({ ...errors, [field]: undefined });
        setShowValidationError(false);
      }
    };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setEditedLead({ ...editedLead, status: e.target.value });
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(editedLead);
      setIsEditing(false);
      if (isNewLead) {
        handleClose();
      }
    } else {
      setShowValidationError(true);
    }
  };

  const handleCancel = () => {
    if (lead) {
      setEditedLead({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "New",
      });
    }
    setIsEditing(false);
    setErrors({});
    setShowValidationError(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isNewLead
            ? "Add New Lead"
            : isEditing
            ? "Edit Lead"
            : "Lead Details"}
        </Typography>

        {showValidationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Please fill in all required fields correctly.
          </Alert>
        )}

        <TextField
          fullWidth
          label="Name"
          value={editedLead.name}
          onChange={handleTextChange("name")}
          margin="normal"
          disabled={!isEditing}
          error={!!errors.name}
          helperText={errors.name}
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={editedLead.email}
          onChange={handleTextChange("email")}
          margin="normal"
          disabled={!isEditing}
          error={!!errors.email}
          helperText={errors.email}
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          value={editedLead.phone}
          onChange={handleTextChange("phone")}
          margin="normal"
          disabled={!isEditing}
          error={!!errors.phone}
          helperText={errors.phone || "Enter numbers only (minimum 10 digits)"}
          required
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            placeholder: "e.g., 1234567890",
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={editedLead.status}
            onChange={handleStatusChange}
            disabled={!isEditing}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          {!isNewLead && !isEditing && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          {isEditing && (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          )}
          {isEditing && !isNewLead && (
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LeadModal;
