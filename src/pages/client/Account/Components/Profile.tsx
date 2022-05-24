import React from 'react';
import moment from 'moment';
import { Stepper, StepLabel, StepContent, TextField, AlertColor, CircularProgress } from '@mui/material';
import Select, { SingleValue } from 'react-select';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import clientService from '../../../../services/clientService';
import { ColorSchema, CustomStep, MuiButton } from '../../../../components/MuiStyling/MuiStyling';
import { ClientInfoAttributes } from '../../../../reduxToolKit-Saga/types/auth';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';
import { Refresher } from '../Account';

interface ProvinceDisplay {
  value: string;
  label: string;
}
type DistrictDisplay = ProvinceDisplay;
type WardDisplay = ProvinceDisplay;
type GenderDisplay = ProvinceDisplay;

interface ProfileProps {
  info: ClientInfoAttributes | undefined;
  loadingState: boolean;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<Refresher>>;
}

interface AdditionalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  addressDetail: string;
  phoneNumber: string;
}

const genderOption: GenderDisplay[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const Profile: React.FC<ProfileProps> = ({ info, loadingState, setLoadingState, setRefresh }) => {
  const [province, setProvince] = React.useState<ProvinceDisplay[]>([]);
  const [district, setDistrict] = React.useState<DistrictDisplay[]>([]);
  const [ward, setWard] = React.useState<WardDisplay[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [snackBarState, setSnackBarState] = React.useState<boolean>(false);
  const [provinceSelect, setProvinceSelect] = React.useState<SingleValue<ProvinceDisplay>>();
  const [snackbarType, setSnackbarType] = React.useState<AlertColor>();
  const [districtSelect, setDistrictSelect] = React.useState<SingleValue<DistrictDisplay>>();
  const [wardSelect, setWardSelect] = React.useState<SingleValue<WardDisplay>>();
  const [finalInfo, setFinalInfo] = React.useState<AdditionalInfo>({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    addressDetail: '',
    phoneNumber: '',
  });

  const fetchProvince = async () => {
    try {
      const result = await clientService.getListProvince();
      const converter: ProvinceDisplay[] = result.map((each) => ({
        value: each.province_id,
        label: each.province_name,
      }));
      setProvince(converter);
    } catch (error) {
      console.log('error');
    }
  };

  const fetchDistrict = async (id: string) => {
    try {
      const result = await clientService.getListDistrict(id);
      const converter: ProvinceDisplay[] = result.map((each) => ({
        value: each.district_id,
        label: each.district_name,
      }));
      setDistrict(converter);
    } catch (error) {
      console.log('error');
    }
  };

  const fetchWard = async (id: string) => {
    try {
      const result = await clientService.getListWard(id);
      const converter: WardDisplay[] = result.map((each) => ({
        value: each.ward_id,
        label: each.ward_name,
      }));
      setWard(converter);
    } catch (error) {
      console.log('error');
    }
  };

  React.useEffect(() => {
    fetchProvince();
  }, []);

  const dbProvince = React.useCallback(() => {
    if (info !== undefined && info.addressProvince) {
      fetchProvince();
      if (province !== undefined) {
        const existedProvince = province.find((each) => each.value === info.addressProvince);
        setProvinceSelect(existedProvince);
      }
    }
  }, [province, info]);

  const dbDistrict = React.useCallback(() => {
    if (info !== undefined && info.addressProvince && info.addressDistrict) {
      fetchDistrict(info.addressProvince);
      if (district !== undefined) {
        const existedDistrict = district.find((each) => each.value === info.addressDistrict);
        setDistrictSelect(existedDistrict);
      }
    }
  }, [district, info]);

  const dbWard = React.useCallback(() => {
    if (info !== undefined && info.addressProvince && info.addressDistrict && info.addressWard) {
      fetchWard(info.addressDistrict);
      if (ward !== undefined) {
        const existedWard = ward.find((each) => each.value === info.addressWard);
        setWardSelect(existedWard);
      }
    }
  }, [ward, info]);

  React.useEffect(() => {
    if (!districtSelect) {
      dbDistrict();
    }
    if (!wardSelect) {
      dbWard();
    }
    if (!provinceSelect) {
      dbProvince();
    }
    setFinalInfo({
      firstName: info !== undefined && info.firstName ? info.firstName : '',
      lastName: info !== undefined && info.lastName ? info.lastName : '',
      gender: info !== undefined && info.gender ? info.gender : '',
      dateOfBirth: info !== undefined && info.dob !== null ? moment(info?.dob).toDate() : null,
      addressDetail: info !== undefined && info.addressDetail !== null ? info.addressDetail : '',
      phoneNumber: info !== undefined && info.phoneNumber ? info.phoneNumber : '',
    });
  }, [info, dbWard, dbDistrict, dbProvince, wardSelect, districtSelect, provinceSelect]);

  React.useEffect(() => {
    if (provinceSelect) {
      fetchDistrict(provinceSelect.value);
    }
  }, [provinceSelect]);

  React.useEffect(() => {
    if (districtSelect) {
      fetchWard(districtSelect.value);
    }
  }, [districtSelect]);

  const submitChangeInfo = async () => {
    try {
      setLoadingState(true);
      await clientService.updateCLientInfo({
        firstName: finalInfo.firstName,
        lastName: finalInfo.lastName,
        country: 'Viet Nam',
        detail: finalInfo.addressDetail,
        district: districtSelect ? districtSelect.value : '',
        dob: finalInfo.dateOfBirth !== null ? moment(finalInfo.dateOfBirth).format('M/D/YYYY') : '',
        gender: finalInfo.gender ? finalInfo.gender : '',
        phoneNumber: finalInfo.phoneNumber,
        province: provinceSelect ? provinceSelect.value : '',
        ward: wardSelect ? wardSelect.value : '',
        timezone: 'Asia/Saigon',
      });
      setMessage('Update client information successfully');
      setSnackbarType('success');
      setRefresh(Refresher.START);
    } catch (error) {
      setSnackbarType('error');
      setMessage('Something went wrong please retype all field');
    } finally {
      setSnackBarState(true);
      setLoadingState(false);
    }
  };

  return (
    <>
      <p className="text-guild-line">profile</p>
      <div>
        <p className="text-support">Address</p>
        <Stepper orientation="vertical">
          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Select your Province</p>
            </StepLabel>
            <StepContent>
              <Select
                onChange={(newValue: SingleValue<ProvinceDisplay>) => setProvinceSelect(newValue)}
                options={province}
                value={provinceSelect}
              />
            </StepContent>
          </CustomStep>
          <CustomStep active={provinceSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Select your District</p>
            </StepLabel>
            <StepContent>
              <Select
                value={districtSelect}
                onChange={(newValue: SingleValue<DistrictDisplay>) => setDistrictSelect(newValue)}
                options={district}
                placeholder="District"
              />
            </StepContent>
          </CustomStep>
          <CustomStep active={districtSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Select your Ward</p>
            </StepLabel>
            <StepContent>
              <Select
                value={wardSelect}
                onChange={(newValue: SingleValue<WardDisplay>) => setWardSelect(newValue)}
                options={ward}
                placeholder="Ward"
              />
            </StepContent>
          </CustomStep>
          <CustomStep active={wardSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Input your detail address</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.addressDetail}
                onChange={(e) => setFinalInfo({ ...finalInfo, addressDetail: e.target.value })}
              />
            </StepContent>
          </CustomStep>
        </Stepper>
      </div>
      <div className="mt-8">
        <p className="text-support">Info</p>
        <Stepper orientation="vertical">
          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Enter your first name</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.firstName}
                onChange={(e) => setFinalInfo({ ...finalInfo, firstName: e.target.value })}
              />
            </StepContent>
          </CustomStep>
          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Enter your last name</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.lastName}
                onChange={(e) => setFinalInfo({ ...finalInfo, lastName: e.target.value })}
              />
            </StepContent>
          </CustomStep>
          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Enter your phone number</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.phoneNumber}
                placeholder="9 to 12 digit"
                onChange={(e) => setFinalInfo({ ...finalInfo, phoneNumber: e.target.value })}
              />
            </StepContent>
          </CustomStep>

          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Select your birthday</p>
            </StepLabel>
            <StepContent>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={finalInfo?.dateOfBirth}
                  onChange={(newValue) => {
                    setFinalInfo({ ...finalInfo, dateOfBirth: newValue });
                  }}
                  renderInput={(params) => <TextField fullWidth sx={{ backgroundColor: '#ffffff' }} {...params} />}
                />
              </LocalizationProvider>
            </StepContent>
          </CustomStep>
          <CustomStep active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">What is your gender</p>
            </StepLabel>
            <StepContent>
              <Select
                value={
                  {
                    value: finalInfo.gender,
                    label: finalInfo.gender,
                  } as SingleValue<GenderDisplay>
                }
                onChange={(newValue: SingleValue<GenderDisplay>) =>
                  setFinalInfo({ ...finalInfo, gender: newValue?.value as string })
                }
                options={genderOption}
                placeholder="Gender"
              />
            </StepContent>
          </CustomStep>
        </Stepper>
      </div>

      <MuiButton
        sx={{ width: '100%', marginTop: '3rem', textTransform: 'capitalize', letterSpacing: '2px' }}
        onClick={submitChangeInfo}
      >
        {loadingState === true ? <CircularProgress sx={{ color: '#fff', padding: '6px' }} /> : 'Submit'}
      </MuiButton>

      <CustomSnackbar snackbarColor={snackbarType} res={message} open={snackBarState} setOpen={setSnackBarState} />
    </>
  );
};

export default Profile;
