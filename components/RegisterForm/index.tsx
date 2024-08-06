"use client";

import React, { useCallback, useState } from "react";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { Register } from "@/types/auth";

const styleInput = {
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputBase-input": {
    paddingTop: "8px !important",
    paddingLeft: "12px",
  },
  "& .MuiFormLabel-root": {
    fontSize: "18px",
  },
  "& .MuiInputBase-root:hover": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputAdornment-root": {
    mb: 2,
  },
};

interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function RegisterForm({
  dictionary,
  handleSubmitForm,
  errorMessage,
  handleChangeErrorMessage
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["register"];
  handleSubmitForm: (data: Register) => void;
  errorMessage: string;
  handleChangeErrorMessage: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedPolicy, setCheckedPolicy] = React.useState(false);

  const authSchema = Yup.object()
    .shape({
      full_name: Yup.string()
        .required(`${dictionary.requiredField}`)
        .max(255, `${dictionary.fullNameRequired}`),
      email: Yup.string()
        .required(`${dictionary.requiredField}`)
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, `${dictionary.formatEmail}`),
      password: Yup.string()
        .required(`${dictionary.requiredField}`)
        .min(8, `${dictionary.minPassword}`)
        .max(15, `${dictionary.maxPassword}`)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
          `${dictionary.validatePassword}`,
        ),
      confirm_password: Yup.string()
        .required(`${dictionary.requiredField}`)
        .oneOf([Yup.ref("password")], `${dictionary.validateConfirmPassword}`),
    })
    .required();

  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
  } = useForm<RegisterForm>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(authSchema),
    mode: "all",
  });

  const onSubmit = (data: Register) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dataTemp: Register = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    handleSubmitForm(dataTemp);
  };

  const handleShowPassword = useCallback((type: string) => {
    if (type === "password") return setShowPassword((show) => !show);
    setShowConfirmPassword((show) => !show);
  }, []);

  const handleChangeCheckedPolicy = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckedPolicy(event.target.checked);
  };

  return (
    <div className="lg:w-[500px] m-auto px-[24px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography>{dictionary.fullName}</Typography>
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  id="1"
                  {...field}
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderFullName}
                  error={!!errors?.full_name}
                  helperText={errors.full_name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("full_name");
                    handleChangeErrorMessage();
                  }}
                  onBlur={(e) => {
                    field.onChange(
                      e.target.value
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\s+/g, " "),
                    );
                  }}
                />
              );
            }}
          />
          <Typography sx={{ mt: "36px !important" }}>
            {dictionary.email}
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  id="2"
                  {...field}
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderEmail}
                  error={!!errors?.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("email");
                    handleChangeErrorMessage();
                  }}
                  onBlur={(e) => {
                    field.onChange(
                      e.target.value
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\s+/g, " "),
                    );
                  }}
                />
              );
            }}
          />
          <Typography sx={{ mt: "36px !important" }}>
            {dictionary.password}
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  id="3"
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderPassword}
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ paddingBottom: "0 !important" }}
                        position="end"
                      >
                        <IconButton
                          onClick={() => handleShowPassword("password")}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("password");
                    handleChangeErrorMessage();
                  }}
                />
              );
            }}
          />
          <Typography sx={{ mt: "36px !important" }}>
            {dictionary.confirmPassword}
          </Typography>
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  id="4"
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ paddingBottom: "0 !important" }}
                        position="end"
                      >
                        <IconButton
                          onClick={() => handleShowPassword("confirm_password")}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("confirm_password");
                    handleChangeErrorMessage();
                  }}
                />
              );
            }}
          />
        </Stack>
        <div className="mt-[36px] flex items-center">
          <Checkbox
            checked={checkedPolicy}
            onChange={handleChangeCheckedPolicy}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p className="text-[14px]">
            {dictionary.accept}
            <Link className="text-[#254ACC]" href={`/terms-of-service`}>
              {" "}
              {dictionary.termOfServce}{" "}
            </Link>
            {dictionary.and}
            <Link className="text-[#254ACC]" href={`/privacy-policy`}>
              {" "}
              {dictionary.privacyPolicy}
            </Link>
          </p>
        </div>

        {errorMessage && <p className="mt-6 text-center text-[12px] text-[#D32F2F] font-medium">{errorMessage}</p>}

        <button
          type="submit"
          disabled={!checkedPolicy}
          className="w-full mt-[24px] px-[20px] h-[42px] text-[#FFFFFF] text-[16px] bg-[#3563E9] font-bold hover:bg-[#54A6FF] rounded-[10px]"
        >
          {dictionary.signUp}
        </button>
        <div className="mt-[36px] flex justify-center">
          <p className="text-[14px]">
            {dictionary.alreadyHaveAccount}
            <Link className="text-[#254ACC]" href={`/login`}>
              {" "}
              {dictionary.signInHere}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
